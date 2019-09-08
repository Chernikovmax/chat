const dbConnect = require("../dbConnection");
const Room = require("../models/Rooms");

module.exports = async (messageObj, roomId) => {
  // Adding new message to the needed room
  await dbConnect;

  const neededRoom = await Room.findById(roomId);
  await neededRoom.messages.push(messageObj);
  await neededRoom.save();

  const { users } = neededRoom;

  return users;
};
