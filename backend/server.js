// Creating an express framework app
const app = require("express")();
// Creating an http server
const server = require("http").Server(app);
// Creating a WebSocket connection based on server that was made above
const io = require("socket.io")(server);
// Adding "mongoose" library
const mongoose = require("mongoose");
// Creating a "Port" constant that'll be used for the localhost connection
const PORT = 3030;

const MessagesModel = require("./models/Messages");

// Defined listening of the events and handles them
io.on("connection", client => {
  console.log("user connected");

  // There is also a special disconnect event that gets fire each time a user closes the tab.
  client.on("disconnect", () => {
    console.log(`User "${client.id}" was disconnected...`);
  });

  // There is a custom event which called "message", it works every time
  // on receiving a message object from the chat users
  // and sends this message to all connected users
  client.on("message", data => {
    io.emit("message", data);
  });
});

// Wire up the server to listen to our port(3030)
server.listen(PORT, err => {
  if (err) throw err;
  console.log("Listening on port 3030");
});
