const server = require("http").createServer();
const io = require("socket.io")(server);

io.on("connection", client => {
  client.on("register", handleRegister);

  client.on("join", handleJoin);

  client.on("leave", handleLeave);

  client.on("message", handleMessage);

  client.on("chatrooms", handleGetChatrooms);

  client.on("availableUsers", handleGetAvailableUsers);

  client.on("disconnect", () => {
    console.log(`User "${client.id}" was disconnected...`);
    handleDisconnect();
  });

  client.on("error", err => {
    console.error(`Received error from user "${client.id}":`, err);
  });
});

server.listen(3030, err => {
  if (err) throw err;
  console.log("listening on port 3030");
});
