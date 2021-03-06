const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/todos-db";

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (e) {
    console.log(e);
  }
};
connect();

module.exports = MONGODB_URI;
