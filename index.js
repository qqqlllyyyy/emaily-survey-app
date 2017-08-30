const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");

const app = express();

//-------------------------------------------------------------------
// Use Passport
//-------------------------------------------------------------------
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('profile', profile);
    }
  )
);

//-------------------------------------------------------------------
// Route Handler
//-------------------------------------------------------------------
// Homepage
app.get(
  "/",
  (req, res) => {
    res.send({ hi: 'there' });
  }
);
// Google OAuth
app.get(
  "/auth/google",
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);
// Callback
app.get(
  "/auth/google/callback",
  passport.authenticate('google')
);

//-------------------------------------------------------------------
// Listen to Port
//-------------------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT);
