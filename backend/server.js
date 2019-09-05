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
// Import model for adding users to the DB
const User = require("./models/Users");
// Import model for creating Rooms collection and Rooms that will be placed in it on DB
const Room = require("./models/Rooms");

// Import database connection
const dbConnect = require("./dbConnection");

const actions = require("./actions");
const userRegistrationService = require("./services/userRegistrationService");
const roomDataService = require("./services/roomDataService");
// Defined listening of the events and handles them
io.on("connection", async client => {
  console.log("user connected");
  const newChatRoom = new Room();
  newChatRoom.save();
  // console.log(
  //   "CHATROOM!!!!!!!!!!!!!!! messages:",
  //   await Room.findById(newChatRoom.messages)
  // );
  client.emit();
  // Adding new user to the DB
  client.on("action", async action => {
    switch (action.type) {
      case "REGISTER_USER_REQUEST":
        return userRegistrationService(action.user).then(
          user => io.emit("action", actions.registerUserRequestSuccess(user)),
          err => io.emit("action", actions.registerUserRequestFailure(err))
        );

      case "GET_ROOM_DATA_REQUEST":
        return roomDataService(newChatRoom._id).then(
          roomData =>
            io.emit("action", actions.getRoomDataRequestSuccess(roomData)),
          err => io.emit("action", actions.getRoomDataRequestFailure(err))
        );
      default:
        return;
    }
  });

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
      await newChatRoom.save(newMessage.save());
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
