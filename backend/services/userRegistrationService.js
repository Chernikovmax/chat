const dbConnect = require("../dbConnection");
const User = require("../models/Users");

module.exports = async (_id, userName) => {
  await dbConnect;
  const existingUser = await User.findById(_id);
  if (existingUser) {
    existingUser.userName = userName;
    await existingUser.save();
    return existingUser;
  } else {
    const newOnlineUser = await new User({ _id, userName });
    await newOnlineUser.save();
    return newOnlineUser;
  }
};
