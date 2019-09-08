// Adding "mongoose" library
const mongoose = require("mongoose");
const DB_LINK = "mongodb://127.0.0.1:27017/chat";

const dbConnect = mongoose.connect(DB_LINK, {
  useNewUrlParser: true,
  useFindAndModify: false
});

module.exports = dbConnect;
