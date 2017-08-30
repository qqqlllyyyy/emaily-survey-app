const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

// // Route Handler
// app.get("/", (req, res) => {
//   res.send({ hi: "hey you~~" });
// });

// Use Passport
passport.use(new GoogleStrategy());

// Listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT);
