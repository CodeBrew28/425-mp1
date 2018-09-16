#!/usr/bin/env node
var WebSocketClient = require('websocket').client;
const argv = require('yargs').argv
var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});


const sendNumber = connection =>  {
    if (connection.connected) {
        var number = Math.round(Math.random() * 0xFFFFFF);
        connection.sendUTF(number.toString());
    }
}

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });
    console.log(argv)

    sendNumber(connection);
});

client.connect('ws://localhost:8080/', 'echo-protocol');


// if (argv.ships > 3 && argv.distance < 53.5) {
//   console.log('Plunder more riffiwobbles!')
// } else {
//   console.log('Retreat from the xupptumblers!')
// }