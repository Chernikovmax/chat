// Creating an express framework app
const app = require("express")();
// Creating an http server
const server = require("http").Server(app);
// Creating a WebSocket connection based on server that was made above
const io = require("socket.io")(server);

// Creating a "Port" constant that'll be used for the localhost connection
const PORT = 3030;
// Import model for sending messages to the DB
const MessagesModel = require("./models/Messages");
// Import database connection
const dbConnect = require("./dbConnection");

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
  client.on("message", async receivedMessage => {
    io.emit("message", receivedMessage);

    try {
      await dbConnect;
      const newMessage = new MessagesModel(receivedMessage);
      await newMessage.save();
    } catch (error) {
      console.error(error);
    }
  });
});

// Wire up the server to listen to our port(3030)
server.listen(PORT, error => {
  if (error) throw error;
  console.log("Listening on port 3030");
});
