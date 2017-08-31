const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");

require("./models/User");
require("./services/passport");

//-------------------------------------------------------------------
// Connect to MongoDB
//-------------------------------------------------------------------
mongoose.connect(keys.mongoURI);

// This is a function that takes our 'app' and attach two routes to it.
const authRoutes = require("./routes/authRoutes");
const app = express();
authRoutes(app);

//-------------------------------------------------------------------
// Route Handler
//-------------------------------------------------------------------
// Homepage
app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

//-------------------------------------------------------------------
// Listen to Port
//-------------------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT);
