const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

require("./models/User");
require("./models/Survey");
require("./services/passport");

//-------------------------------------------------------------------
// Connect to MongoDB
//-------------------------------------------------------------------
mongoose.connect(keys.mongoURI);

// This is a function that takes our 'app' and attach two routes to it.
const authRoutes = require("./routes/authRoutes");
const app = express();

//-------------------------------------------------------------------
// Apply Middleware: bodyParser
//-------------------------------------------------------------------
// When a request with body comes in, the middleware will parse the body
// and assign it to 'req.body' of the incoming request.
app.use(bodyParser.json());

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
// Billing & Survey Route Handler
//-------------------------------------------------------------------
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

//-------------------------------------------------------------------
// Instruct Express to Handle Routes Defined in Front-end
//-------------------------------------------------------------------
// only run in production
if (process.env.NODE_ENV == "production") {
  // Express will serve up production assets like our 'main.js' file
  // If any route comes in and we do not understand,
  // then look into 'client/build' and see if there is a file that matches the route.
  app.use(express.static("client/build"));
  // Express will server up the './client/build/index.html' file if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//-------------------------------------------------------------------
// Listen to Port
//-------------------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT);
