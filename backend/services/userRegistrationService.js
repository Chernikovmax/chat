const dbConnect = require("../dbConnection");
const User = require("../models/Users");

module.exports = async userName => {
  await dbConnect;
  const newUser = new User({ userName });
  await newUser.save();
  return newUser;
};
