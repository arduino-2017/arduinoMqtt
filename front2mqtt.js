var express        = require('express');
var app            = express();
var httpServer = require("http").createServer(app);
var io=require('socket.io')(httpServer);
var mqtt = require('mqtt');
var port = 3000;

const mqtt_cli = mqtt.connect('mqtt://localhost');


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
});

httpServer.listen(port);
console.log('Web Server available at http://localhost:' + port);
var led;

//Socket connection handler
io.on('connection', function (socket) {
        console.log(socket.id);

        socket.on('led:on', function (data) {
           mqtt_cli.publish('led', 'on');
           console.log('LED ON RECEIVED');
        });

        socket.on('led:off', function (data) {
            mqtt_cli.publish('led', 'off');
            console.log('LED OFF RECEIVED');

        });
    });

console.log('Waiting for connection');
