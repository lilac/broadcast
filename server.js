const WebSocket = require('ws');
const config = require('config');

const port = config.ws.port;
const wss = new WebSocket.Server({ port });
const redis = require('./redis')
const counter = require('./counter')

function ack(error) {
  // If error is not defined, the send has been completed, otherwise the error
  // object will indicate what failed.
  if (error) {
    console.log(error);
  }
}

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function connection(ws) {
  // ws.on('open', () => {
    counter.incr()
  // })
  ws.on('message', function incoming(data) {
    // console.log(data);
    ws.send('ack', ack);
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, ack);
      }
    });
  });
  ws.on('error', (error) => console.log(error));
  ws.send('Connected', ack);

  ws.on('close', (code, reason) => {
    counter.decr()
  })
});

wss.on('error', function (error) {
  console.log(error);
});

console.log(`WebSocket listening on ${port}`)

