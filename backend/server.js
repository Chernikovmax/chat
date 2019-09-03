const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const PORT = 3030;

server.listen(PORT, err => {
  if (err) throw err;
  console.log("Listening on port 3030");
});

io.on("connection", client => {
  console.log("user connected");

  client.on("disconnect", () => {
    console.log(`User "${client.id}" was disconnected...`);
  });

  client.on("message", data => {
    io.emit("message", data);
  });
});
