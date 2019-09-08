const dbConnect = require("../dbConnection");
const User = require("../models/Users");

// We creating new user and returning it as a result of this function
module.exports = async (clientId, userName) => {
  await dbConnect;
  const newOnlineUser = await new User({ clientId, userName });
  await newOnlineUser.save();
  return newOnlineUser;
};
