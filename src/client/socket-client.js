const io = require("socket.io-client");

const socket = io.connect("http://localhost:3030");

function registerHandler(onMessageReceived) {
  socket.on("message", onMessageReceived);
}

function unregisterHandler() {
  socket.off("message");
}

socket.on("error", err => {
  console.error("Received socket error:", err);
});

function register(name, handlerFunction) {
  socket.emit("register", name, handlerFunction);
}

function join(chatroomName, handlerFunction) {
  socket.emit("join", chatroomName, handlerFunction);
}

function leave(chatroomName, handlerFunction) {
  socket.emit("leave", chatroomName, handlerFunction);
}

function message(chatroomName, msg, handlerFunction) {
  socket.emit("message", { chatroomName, messageText: msg }, handlerFunction);
}

function getChatrooms(handlerFunction) {
  socket.emit("chatrooms", null, handlerFunction);
}

function getAvailableUsers(handlerFunction) {
  socket.emit("availableUsers", null, handlerFunction);
}
