const dbConnect = require("../dbConnection");
const Room = require("../models/Rooms");
const User = require("../models/Users");

module.exports = async (roomId, userSocketId = null) => {
  try {
    await dbConnect;

    // Searching needed room
    const desiredRoom = await Room.findById(roomId);

    // If "userSocketId" was given that means it's the case we need to add new user in existing room
    if (userSocketId) {
      desiredRoom.users.push(userSocketId);
      await desiredRoom.save();
    }

    const arrayOfNames = [];

    // Going through the array of ids to get usernames in the desired room
    for (let i = 0; i < desiredRoom.users.length; i++) {
      const user = await User.findById(desiredRoom.users[i]);
      arrayOfNames.push(user.userName);
    }

    console.log("Array", arrayOfNames);
    return {
      roomId: roomId,
      roomMessages: desiredRoom.messages,
      roomUsers: arrayOfNames
    };
  } catch (error) {
    console.error(error);
  }
};
