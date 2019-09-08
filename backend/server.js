// Creating an express framework app
const app = require("express")();
// Creating an http server
const server = require("http").Server(app);
// Creating a WebSocket connection based on server that was made above
const io = require("socket.io")(server);

// Creating a "Port" constant that'll be used for the localhost connection
const PORT = 3030;

// Import model for adding users to the DB
const User = require("./models/Users");
// Import model for creating Rooms collection and Rooms that will be placed in it on DB
const Room = require("./models/Rooms");

const actions = require("./actions");
const userRegistrationService = require("./services/userRegistrationService");
const roomDataService = require("./services/roomDataService");
const sendMessageService = require("./services/sendMessageService");

// Definition of the storage where will be placed our socket connections by connection ids as keys
const connectionsStore = {};
// Defined listening of the events and handles them
io.on("connection", async client => {
  let idOfCurrentChatRoom = null;
  connectionsStore[client.id] = client;

  console.log("user connected");

  client.emit();
  // Adding new user to the DB
  client.on("action", async action => {
    switch (action.type) {
      case "REGISTER_USER_REQUEST":
        return userRegistrationService(client.id, action.user).then(
          async user => {
            client.emit("action", actions.registerUserRequestSuccess(user));
          },
          err => client.emit("action", actions.registerUserRequestFailure(err))
        );

      case "GET_ROOM_DATA_REQUEST":
        // In case we get "acton.roomId", we need to redirect to existing chat room
        return (action.roomId
          ? roomDataService(action.roomId, client.id)
          : roomDataService(null, client.id)
        ).then(
          async roomData => {
            const { users } = roomData;

            users.forEach(userObj =>
              // Sending uploaded room data to every user in needed room
              {
                try {
                  const { clientId } = userObj;
                  connectionsStore[clientId].emit(
                    "action",
                    actions.getRoomDataRequestSuccess(roomData)
                  );
                } catch (error) {
                  console.error(error);
                }
              }
            );
            idOfCurrentChatRoom = roomData._id;
          },
          err => client.emit("action", actions.getRoomDataRequestFailure(err))
        );

      case "SEND_MESSAGE":
        return sendMessageService(action.newMessage, action.roomId).then(
          async result => {
            try {
              const { users } = result;
              // Notify client about successfully sent message
              client.emit("action", actions.sendMessageSuccess());

              // Sending updated room data to all users in current room except current user
              users.forEach(userObj => {
                if (userObj.clientId !== client.id) {
                  connectionsStore[userObj.clientId].emit(
                    "action",
                    actions.getRoomDataRequestSuccess(result)
                  );
                }
              });
            } catch (error) {
              console.error(error);
            }
          },
          err => client.emit("action", actions.sendMessageFailure(err))
        );
      default:
        return;
    }
  });

  // There is also a special disconnect event that gets fire each time a user closes the tab.
  client.on("disconnect", async () => {
    try {
      if (idOfCurrentChatRoom) {
        await User.deleteOne({
          clientId: client.id
        });

        const currentRoom = await Room.findById(idOfCurrentChatRoom);

        currentRoom.users = currentRoom.users.filter(
          user => user.clientId !== client.id
        );
        await currentRoom.save();

        // Sending updated data of current room for all rest members
        currentRoom.users.forEach(userObj => {
          connectionsStore[userObj.clientId].emit(
            "action",
            actions.getRoomDataRequestSuccess(currentRoom)
          );
        });

        // Delete current chat room if there are no users in it
        if (!currentRoom.users.length) {
          Room.findOneAndDelete({ _id: idOfCurrentChatRoom });
        }
      }

      // Deleting connection from global object with socket connections
      delete connectionsStore[client.id];
    } catch (error) {
      console.error(error);
    }

    console.log(`User "${client.id}" was disconnected...`);
  });
});

// Wire up the server to listen to our port(3030)
server.listen(PORT, error => {
  if (error) throw error;
  console.log("Listening on port 3030");
});
