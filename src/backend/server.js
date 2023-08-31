const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const db = require("./firebaseForServer");
const { ref, get, child, update, set } = require("firebase/database");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin",
			"http://localhost:4200");
	res.header("Access-Control-Allow-Origin",
			"http://localhost:3000");
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

	var obj = req.body;

	Object.keys(obj).forEach(key => {
		console.log(key, obj[key]);
	  });

	  res.status(500).json({
        name:req.body.name,
    })
})

app.post('/getMenu', (req, res) => {
	const starCountRef = ref(db);
        get(child(starCountRef, req.body.branch_name+"/menu")).then((snapshot) => {
          if (snapshot.exists()) { 
			  res.status(500).send(snapshot.val());
          } else {
            console.log("post");
          }
        }).catch((error) => {
          console.error(error);
        });	
})