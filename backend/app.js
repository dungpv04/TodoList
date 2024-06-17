var express = require('express')
var controller = require('./taskController')
var cors = require('cors')
var http = require('http')
const port = process.env.PORT || 8080


let app = express()

app.use(cors())

app.use(function (req, res, next) {
    //res.append('Access-Control-Allow-Origin', 'no-cors');
    res.append('Access-Control-Allow-Method', 'GET, PUT, POST, DELETE');
    res.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next()
});

app.get('/tasks', async function(req, res){
    const data = await controller.get();
    res.json(data);
});

app.post("/tasks/:name", express.json(), async function(req, res){
    var taskName = req.body
    console.log(req.body)
    const post = await controller.post(taskName.name);
    res.status(200)
});

app.put("/tasks/:id/:status", express.json(), async function(req, res){
    const patch = await controller.patch(req.body, "status");
    res.send({"status": "OK"});
});

app.put("/tasks/:id/:name", express.json(), async function(req, res){
    console.log(req.body)
    console.log(req.body.id)
    const patch = await controller.patch(req.body, "edit")
});

app.delete("/tasks/:id", express.json(), async function(req, res){
    const del = await controller.delete(req.body);
    res.send({"status": "OK"})
});

app.listen(port);
