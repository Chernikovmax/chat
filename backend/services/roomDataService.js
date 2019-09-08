const dbConnect = require("../dbConnection");
const Room = require("../models/Rooms");
const User = require("../models/Users");

module.exports = async (roomId, userSocketId) => {
  try {
    await dbConnect;

    // Searching needed room
    const desiredRoom = await Room.findById(roomId);
    console.log("DESIREDROOOOM", desiredRoom);
    const currentUser = await User.find({ clientId: userSocketId });
    desiredRoom.users.push({
      userName: currentUser[0].userName,
      clientId: currentUser[0].clientId
    });
    await desiredRoom.save();

    // const arrayOfNames = [];

    // // Going through the array of ids to get usernames in the desired room
    // for (let i = 1; i < desiredRoom.users.length; i++) {
    //   arrayOfNames.push(desiredRoom.users[i].userName);
    // }

    return desiredRoom;
  } catch (error) {
    console.error(error);
  }
};
