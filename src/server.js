const WebSocket = require("ws");

const wsServer = new WebSocket.Server({ port: 8080 });

// const clients = new Set();

wsServer.on("connection", ws => {
  ws.on("message", incomingData => {
    wsServer.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(incomingData);
      }
    });
  });
});
