const jwt = require("jsonwebtoken");
const User = require("../model/user-model");
require('dotenv').config();

const verifytoken = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.header("authorization")?.split(' ')[1];

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        // Attach the decoded user information to the request object
        req.user = decoded;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        // Return a 400 Bad Request status if the token is invalid
        return res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = verifytoken; // Don't forget to export your middleware
