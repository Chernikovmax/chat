const dbConnect = require("../dbConnection");
const User = require("../models/Users");

module.exports = async (clientId, userName) => {
  await dbConnect;
  const newOnlineUser = await new User({ clientId, userName });
  await newOnlineUser.save();
  return newOnlineUser;
};
