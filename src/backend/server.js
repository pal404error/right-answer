const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const db = require("./firebaseForServer");
const { ref, get, child, update, set, push, remove } = require("firebase/database");
require("firebase/database");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {

	const allowedOrigins = ["http://localhost:4200","http://localhost:3000","http://localhost:5173"];
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		 res.setHeader('Access-Control-Allow-Origin', origin);
	}

	res.header("Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.listen(4000, () => {
	console.log('Server listening on port 4000');
});

app.get('/testing', (req, res) => {
    console.log("working");
    res.status(500).json({
        test:"working",
    })
})

app.post('/editMenu', (req, res) => {
	
	set(ref(db, req.body.branch_name+"/menu/"+req.body.parent_category+"/"+req.body.name),
	{
	   name:req.body.name,
	   description:req.body.description,
	   image_link:req.body.image_link,
	   price:req.body.price,
	}).catch((error) => {
		if(error == null) {console.log("Fine");}
		else {console.error("Error", error);}
	});

	res.status(500).json({
        name:req.body.name,
    })
})

app.post('/newOrder', (req, res) => {
	push(ref(db, "orders/newOrders/"+req.body.table),
	req.body).catch((error) => {
		if(error == null) {console.log("Fine");}
		else {console.error("Error", error);}
	}).then((snap) => {
		update(ref(db, "orders/newOrders/"+req.body.table+"/"+snap.key),
		{"key":snap.key}).catch((error) => {
		if(error == null) {console.log("Fine");}
		else {console.error("Error", error);}
	});
	});
	res.status(200).send(req.body);
})

app.post('/getMenu', (req, res) => {
	const starCountRef = ref(db);
        get(child(starCountRef, req.body.branch_name+"/menu")).then((snapshot) => {
          if (snapshot.exists()) { 
			  res.status(200).send(snapshot.val());
          } else {
            console.log("post");
          }
        }).catch((error) => {
          console.error(error);
        });	
})

app.post('/getOrderData', (req, res) => {
	const starCountRef = ref(db);
        get(child(starCountRef, req.body.branch_name+"/order_data/2023/"+req.body.month)).then((snapshot) => {
          if (snapshot.exists()) { 
			  res.status(200).send(snapshot.val());
          } else {
            console.log("post");
          }
        }).catch((error) => {
          console.error(error);
        });	
})

app.get('/getNewOrders', (req, res) => {
	const starCountRef = ref(db);
        get(child(starCountRef, "orders/newOrders")).then((snapshot) => {
          if (snapshot.exists()) { 
			  res.status(200).send(snapshot.val());
          } else {
            console.log("post");
          }
        }).catch((error) => {
          console.error(error);
        });	
})

app.get('/getCurrentOrders', (req, res) => {
	const starCountRef = ref(db);
        get(child(starCountRef, "orders/currentOrders")).then((snapshot) => {
          if (snapshot.exists()) { 
			  res.status(200).send(snapshot.val());
          } else {
            console.log("post");
          }
        }).catch((error) => {
          console.error(error);
        });	
})

app.post('/acceptOrder', (req, res) => {

	removeOrder(req.body.table, req.body.key);

	push(ref(db, "orders/currentOrders/"+req.body.table),
	req.body).catch((error) => {
		if(error == null) {console.log("Fine");}
		else {console.error("Error", error);}
	}).then((snap) => {
		update(ref(db, "orders/currentOrders/"+req.body.table+"/"+snap.key),
		{"key":snap.key}).catch((error) => {
		if(error == null) {console.log("Fine");}
		else {console.error("Error", error);}
	});
	});
	updateOrderData(req.body);
	res.status(200).send(req.body);
})

app.post('/doneOrder', (req, res) => {
	set(ref(db, "orders/currentOrders/"+req.body.table+"/"+req.body.key), null);

	push(ref(db, "orders/pastOrders/"+req.body.year+"/"+req.body.month),
	req.body).catch((error) => {
		if(error == null) {console.log("Fine");}
		else {console.error("Error", error);}
	}).then((snap) => {
		update(ref(db, "orders/pastOrders/"+req.body.year+"/"+req.body.month+"/"+snap.key),
		{"key":snap.key}).catch((error) => {
		if(error == null) {console.log("Fine");}
		else {console.error("Error", error);}
	});
	});
	res.status(200).send(req.body);
})


function updateOrderData(data)
{
	var month;
	switch (data.month)
	{
		case "01":
			month = "January"
			break;
		
		case "02":
			month = "February"
			break;
		
		case "03":
			month = "March"
			break;
			
		case "04":
			month = "April"
			break;
		
		case "05":
			month = "May"
			break;
		
		case "06":
			month = "June"
			break;
		
		case "07":
			month = "July"
			break;
		
		case "08":
			month = "August"
			break;
		
		case "09":
			month = "September"
			break;
		
		case "10":
			month = "October"
			break;
		
		case "11":
			month = "November"
			break;
		
		case "12":
			month = "December"
			break;

		default:
			break;
	};

	var total_orders = 0;
	var temp_revenue = 0;
	Object.keys(data).forEach(key => {
		if(key === "orderItems")
		{
			Object.keys(data[key]).forEach(key2 => {
				total_orders = total_orders + parseInt(data[key][key2]["quantity"]);
				temp_revenue = temp_revenue + parseInt(data[key][key2]["price"]);
			  });
		}
	  });

	var revenue = 0;
	var orders = 0;
	const starCountRef = ref(db);
	get(child(starCountRef, "vadodara/order_data/"+data.year+"/"+month+"/"+data.date)).then((snapshot) => {
	  if (snapshot.exists()) { 
		revenue = snapshot.val()["revenue"];
		orders = snapshot.val()["total_orders"]; 
	  } else {
		console.log("No exsting data to update.");
	  }

	  revenue = revenue + temp_revenue;
	  orders = orders + total_orders;
	  
	  set(ref(db, "vadodara/order_data/"+data.year+"/"+month+"/"+data.date),
		{
			date:data.date + " " + month.substring(0, 3),
			revenue:revenue,
			total_orders:orders,
		}).catch((error) => {
			if(error == null) {console.log("Fine");}
			else {console.error("Error", error);}
		});
	  
	}).catch((error) => {
	  console.error(error);
	});
}

function removeOrder(table, key)
{
	set(ref(db, "orders/newOrders/"+table+"/"+key), null);
}