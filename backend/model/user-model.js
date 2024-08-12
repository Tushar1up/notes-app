const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// JWT TOKEN CREATION  
userSchema.methods.generatetoken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        name: this.name,
        email: this.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' } // Optional: Set token expiry time
    );
  } catch (error) {
    console.error("Error while creating token:", error);
    throw new Error("Token generation failed");
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
