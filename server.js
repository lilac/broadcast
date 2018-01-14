const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

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
  ws.on('message', function incoming(data) {
    console.log(data);
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
});

wss.on('error', function (error) {
  console.log(error);
});

