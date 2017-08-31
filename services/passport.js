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
      // Try to find a user with current id. Return a promise
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // We already have a record with the given id.
          // The first argument is an error object. The second argument is the user record.
          done(null, existingUser);
        } else {
          // We want to create a new user.
          // Not saved to database yet if we forget '.save()'
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user)); // 'user' is the user just saved.
        }
      });
    }
  )
);
