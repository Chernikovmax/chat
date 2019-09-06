const { Schema, model } = require("mongoose");

// Creating a scheme describing how messages will be looks like in DB.
const UserModelSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  }
});

// Creating and exporting model "Message", which will be used for creating records into DB.
module.exports = model("User", UserModelSchema);
