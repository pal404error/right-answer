const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const db = require("./firebaseForServer");
const { ref, get, child, update, set } = require("firebase/database");

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
	
	console.log(req.body);
	
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

	var orderString = req.body.year+req.body.month+req.body.date+req.body.hour+req.body.minute+req.body.second;

	set(ref(db, "orders/newOrders/"+req.body.table+"/"+orderString),
	{
		"item":req.body.item,
		"quantity":req.body.quantity,
		"price":req.body.price,
		"table":req.body.table,
		"year":req.body.year,
		"month":req.body.month,
		"date":req.body.date,
		"hour":req.body.hour,
		"minute":req.body.minute,
		"second":req.body.second,
		"read":false,
		"approved":false
	}).catch((error) => {
		if(error == null) {console.log("Fine");}
		else {console.error("Error", error);}
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
        get(child(starCountRef, req.body.branch_name+"/order_data/2023/august")).then((snapshot) => {
          if (snapshot.exists()) { 
			  res.status(200).send(snapshot.val());
			  console.log(typeof(req.body));
          } else {
            console.log("post");
          }
        }).catch((error) => {
          console.error(error);
        });	
})