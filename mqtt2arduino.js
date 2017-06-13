//  https://blog.risingstack.com/getting-started-with-nodejs-and-mqtt/
//  https://github.com/jpmens/mqttwarn
//  http://blog.ashwani.co.in/blog/2015-03-10/mqtt-all-you-need-to-get-started/
//  https://stackoverflow.com/questions/26716279/how-to-test-the-mosquitto-server

var express        = require('express');
var app            = express();
var httpServer = require("http").createServer(app);
var five = require("johnny-five");
var io=require('socket.io')(httpServer);
var mqtt = require('mqtt');
var port = 3000;
var led;

//Conectando con el arduino
var board = new five.Board();
board.on("ready", function() {
    console.log('Arduino connected');
    led = new five.Led(13);
});
console.log('Waiting for connection');

//Conectando con el broker
const mqtt_cli = mqtt.connect('mqtt://localhost');

mqtt_cli.on('connect', () => {
  mqtt_cli.subscribe('led')
})


mqtt_cli.on('message', (topic, message) => {
  switch (topic) {
    case 'led':
      return handleLed(message);
  }
});

function handleLed(msg){
  if (msg=='on')
    led.on();
  else
    led.off();
}
