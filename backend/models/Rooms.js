const { Schema, model } = require("mongoose");
// Creating a scheme for storing chat room's messages in DB.

const RoomModelSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true
  },
  messages: Array,
  users: Array
});

module.exports = model("Room", RoomModelSchema);
