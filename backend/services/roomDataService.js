const dbConnect = require("../dbConnection");
const Room = require("../models/Rooms");

module.exports = async roomId => {
  await dbConnect;
  const desiredRoom = await Room.findById(roomId);
  return {
    roomId: roomId,
    roomMessages: desiredRoom.messages,
    roomUsers: desiredRoom.users
  };
};
