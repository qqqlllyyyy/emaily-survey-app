const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
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

//-------------------------------------------------------------------
// Enable Cookie-based Authentication
//-------------------------------------------------------------------
app.use(
  /**
   * @param how long the cookie can exist in the browser
   * @param keys to encrypt our cookie, define it in './config/keys.js'
   */
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days, unit is ms
    keys: [keys.cookieKey] // this must be an array
  })
);
// Tell Passport to Make Use of Cookie
app.use(passport.initialize());
app.use(passport.session());

//-------------------------------------------------------------------
// Add Routes to 'app'
//-------------------------------------------------------------------
authRoutes(app);

//-------------------------------------------------------------------
// Route Handler
//-------------------------------------------------------------------
// Homepage
app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

//-------------------------------------------------------------------
// Billing Route Handler
//-------------------------------------------------------------------
require("./routes/billingRoutes")(app);

//-------------------------------------------------------------------
// Listen to Port
//-------------------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT);
