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

app.get("/hello", function(req, res){
    res.send("Hello");
});

app.listen(port);
