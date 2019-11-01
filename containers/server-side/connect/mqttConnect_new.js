var net = require('net');
var mqttCon = require('mqtt-connection');
var stream = net.createConnection(1883, 'localhost');
var client = mqttCon(stream);

