//-------------------------------------------------------------------
// Use Passport
//-------------------------------------------------------------------
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const keys = require("../config/keys");

// Get access to the database, 'user' collection.
const User = mongoose.model("users");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // Creates a new instance of the user.
      // Not saved to database yet if we forget '.save()'
      new User({ googleId: profile.id }).save();
    }
  )
);
