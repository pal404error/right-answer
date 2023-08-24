const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
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