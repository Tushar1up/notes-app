const express = require("express");
const router = express.Router();
const User = require("../model/user-model");
//middleware
const verifyToken = require("../middleware/auth-middleware")



// Route to handle user creation
router.route("/").post(async (req, res) => {
  const { name, email, password } = req.body;

  const userexists = await User.findOne({ email });
  try {
    if (userexists) {
      return res.json({ message: "user already exists" });
    } else {
      // we are firstly creating a new user  and then we are taking that user data into newuser and creating token of it and sending it in responsee
      const newuser = await User.create(req.body); 
     const token =   newuser.generatetoken();
      console.log("Data entered successfully");

      res.status(201).json({ message: "User created successfully",token});
    }
  } catch (error) {
    console.error("Error while sending data", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//route to handle login

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;

  const userexists = await User.findOne({ email });

  try {
    if (!userexists) {
      return res.json({ message: "email does not exist" });
    }
    if (password !== userexists.password) {
      return res.status(401).json({ message: "Invalid password" });
    }
     
    const token = userexists.generatetoken();
    res.status(200).json({ message: "Login successful",token });
  } catch (error) {
    res.json({ message: "error while login" });
  }
});




module.exports = router;
