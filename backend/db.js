const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();  

async function connectdb() {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Database is connected");
  } catch (error) {
    console.error("The database connection failed:", error.message);
  }
}

module.exports = connectdb;
