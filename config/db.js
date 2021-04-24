const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("MongoDB Connection Succeeded 😍🥰.");
  } catch (error) {
    console.log("😥😣 Error in DB connection: " + error);
  }
};
module.exports = connectDB;
