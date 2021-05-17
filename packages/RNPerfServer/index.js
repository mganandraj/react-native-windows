const WebSocket = require('ws');
const loadDB = require('./db');

(async function(){
const db = await loadDB();
var collection = db.collection("test");

const server = new WebSocket.Server({
  port: 8080
});

server.on('connection', function(socket) {
  socket.on('message', async function(msg) {
    console.log(msg);
    var result = await collection.insertOne(JSON.parse(msg))
  });

  socket.on('open', function(msg) {
    console.log(msg);
  });

  socket.on('error', function(msg) {
    console.log(msg);
  });

  socket.on('close', function() {
    console.log('closed');
  });

});



// var myobj = { name: "Company Inc", address: "Highway 37" };

})()



