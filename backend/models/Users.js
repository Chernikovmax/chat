const { Schema, model } = require("mongoose");

// Creating a scheme describing how messages will be looks like in DB.
const UserModelSchema = new Schema({
  clientId: {
    type: String
  },
  userName: {
    type: String,
    required: true
  }
});

// Creating and exporting model "User", which will be used for creating records into DB.
module.exports = model("User", UserModelSchema);
