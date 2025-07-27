require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
  console.log("⏳ Trying to connect to MongoDB...");

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Atlas is connected");
  } catch (err) {
    console.error("❌ MongoDB Atlas is NOT connected:", err.message);
    process.exit(1); // exit the app if DB fails
  }
}

module.exports = connectDB;
