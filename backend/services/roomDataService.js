const dbConnect = require("../dbConnection");
const Room = require("../models/Rooms");
const User = require("../models/Users");

module.exports = async (roomId, userSocketId) => {
  try {
    await dbConnect;
    // Create chat room if we not trying to connect to the existing, or handling with existing
    let room;
    if (!roomId) {
      room = await new Room();
      await room.save();
    } else {
      // Searching needed room
      room = await Room.findById(roomId);
    }
    const currentUser = await User.find({ clientId: userSocketId });
    room.users.push({
      userName: currentUser[0].userName,
      clientId: currentUser[0].clientId
    });
    await room.save();

    return room;
  } catch (error) {
    console.error(error);
  }
};
