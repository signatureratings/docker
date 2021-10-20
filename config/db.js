const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config");

const mongoURI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectDB = () => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("Succesfully connected DB"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectDB, 5000);
    });
};

module.exports = connectDB;
