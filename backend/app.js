var express = require('express')
var controller = require('./taskController')
var cors = require('cors')
var http = require('http')
const port = process.env.PORT || 8080


let app = express()

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next()
});

app.get('/', async function(req, res){
    const data = await controller.get();
    res.json(data);
});

app.post("/", express.json(), async function(req, res){
    var taskName = req.body
    const post = await controller.post(taskName.name);
    if(post)
        res.send({"status": "OK"});
    else res.status(500).send("Error");
});

app.listen(port);
