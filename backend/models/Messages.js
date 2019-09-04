const { Schema, model } = require("mongoose");

// Creating a scheme describing how messages will be looks like in DB.
export const messageModelSchema = new Schema({
  messageId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    min: 6,
    max: 60
  },
  messageDate: {
    type: String,
    required: true
  },
  messageText: {
    type: String,
    required: true
  }
});

// Creating and exporting model "Message", which will be used for creating records into DB.
module.exports = model("MessagesModel", messageModelSchema);
