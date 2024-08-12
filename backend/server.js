const express = require("express");
const cors = require("cors");
const connectdb = require("./db");
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectdb();

// Routes
const authroute = require("./routes/auth-router");
app.use("/", authroute);
const dashboardroute = require("./routes/dashboard-router");
app.use("/",dashboardroute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
