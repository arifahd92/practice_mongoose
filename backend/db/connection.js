// mongooseConnection.js
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

  function connectToMongoDB() {
 
  return mongoose.connect(
    `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.ufr2nrv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  );
}
//connectToMongoDB() will return a promise

module.exports = connectToMongoDB;
