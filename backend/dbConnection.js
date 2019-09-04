// Adding "mongoose" library
const mongoose = require("mongoose");
const DB_LINK = "mongodb://127.0.0.1:27017/chat";

const dbConnect = mongoose.connect(DB_LINK, {
  useNewUrlParser: true,
  useFindAndModify: false
});

module.exports = dbConnect;

// async function startServer() {
//   try {
//     await mongoose.connect(DB_LINK, {
//       useNewUrlParser: true,
//       useFindAndModify: false
//     });
//     app.listen(PORT, err => {
//       if (err) throw err;
//       console.log("Server has been started on port 3030");
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// const messagesCollection = new MessagesModel(messageObject);
// // Doing a record in DB
// messagesCollection.save(err => {
//   console.error(err);
// });

// startServer();

// const db = mongoose.connection;

// db.on();
