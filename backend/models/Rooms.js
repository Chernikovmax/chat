const { Schema, model } = require("mongoose");

// Creating a scheme for storing chat room's messages in DB.
const RoomModelSchema = new Schema({
  messages: Array,
  users: Array
});

// Exporting model "Room", which will be used for creating records into DB.
module.exports = model("Room", RoomModelSchema);
