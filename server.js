var express = require('express')
var app = new express();
var fs = require('fs')
var Binance = require('node-binance-api')

app.set("view engine", "ejs");
app.set("views", "./views")

app.use(express.static("public"))
var server = require("http").Server(app);

var io = require("socket.io")(server);
app.io = io;
server.listen('3000')

io.on("connection", function(socket){
    console.log('New connection ' + socket.id);
})

readFile('./config.json');

function readFile(File) {
    var obj;
    fs.readFile(File, "utf-8", (err, data) => {
        if (err) throw err;
        obj = JSON.parse(data)

        const binance = new Binance().options({
            APIKEY: obj.API,
            APISECRET: obj.KEY
        })
        require('./routes/client')(app, obj, binance)
    })
}
console.log('0x001d3f1ef827552ae1114027bd3ecf1f086ba0f9'.length)

