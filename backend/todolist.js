var http = require('http')
var url = require('url')
var events = require('events')
var eventEmitter = new events.EventEmitter();
var sql = require('mssql/msnodesqlv8')

function eventHandler(status){
    if(status === "OK")
        console.log("OK");
    else console.log("Error");
}

eventEmitter.on("status", eventHandler)

http.createServer(function(req, res){
    var txt = req.url;
    if(txt === "/yes"){
        res.writeHead(200, {"Content-Type": "text/html"});
        eventEmitter.emit("status", "OK")
        res.end("<h1>Founded</h1>");
    }
    else{
        res.writeHead(404, {"Content-Type": "text/html"})
        eventEmitter.emit("status", "Not OK");
        res.end("<h1>Error 404 Not Found</h1>");
    }

}).listen(8080)

var config = {
    
    server: 'DESKTOP-CKTBGDM\\SQLEXPRESS',
    database: 'nodejs',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
};

const db = () =>sql.connect(config, function(err){
    if(err) console.log(err);
    var request = new sql.Request();
    request.query("insert into tasks(name, status) values('Walking3', 1)", function(err, data){
        if(err) console.log(err);
        const output = JSON.stringify(data.recordset);
        console.log(output)
        return output;
    });
    
});
