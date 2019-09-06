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

// Definition of the storage where will be placed our socket connections by connection ids as keys
const connectionsStore = {};
// Defined listening of the events and handles them
io.on("connection", async client => {
  connectionsStore[client.id] = client;

  console.log("user connected");
  const newChatRoom = new Room();
  newChatRoom.save();

  client.emit();
  // Adding new user to the DB
  client.on("action", async action => {
    switch (action.type) {
      case "REGISTER_USER_REQUEST":
        return userRegistrationService(client.id, action.user).then(
          async user => {
            newChatRoom.users.push(client.id);
            await newChatRoom.save();
            client.emit("action", actions.registerUserRequestSuccess(user));
          },
          err => client.emit("action", actions.registerUserRequestFailure(err))
        );

      case "GET_ROOM_DATA_REQUEST":
        // In case we get "acton.roomId" we also get "action.userName"
        return (action.roomId
          ? roomDataService(action.roomId, client.id)
          : roomDataService(newChatRoom._id)
        ).then(
          async roomData => {
            const roomUsersToNotify = await Room.findById(roomData.roomId);
            // Getting array of socket connection ids in room
            const { users } = roomUsersToNotify;
            users.forEach(socketId =>
              // Sending uploaded room data to every user in needed room
              connectionsStore[socketId].emit(
                "action",
                actions.getRoomDataRequestSuccess(roomData)
              )
            );
          },
          err => client.emit("action", actions.getRoomDataRequestFailure(err))
        );
      default:
        return;
    }
  });

  // There is also a special disconnect event that gets fire each time a user closes the tab.
  client.on("disconnect", () => {
    // Deleting a connection from the storage on disconnect
    delete connectionsStore[client.id];
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
