const dbConnect = require("../dbConnection");
const Room = require("../models/Rooms");

module.exports = async (messageObj, roomId) => {
  // Adding new message to the needed room and  returning an object
  // with current room's users array and needed in  as a result of this function
  await dbConnect;

  const neededRoom = await Room.findById(roomId);
  await neededRoom.messages.push(messageObj);
  await neededRoom.save();

  return neededRoom;
};
