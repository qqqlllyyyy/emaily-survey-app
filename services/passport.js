//-------------------------------------------------------------------
// Use Passport
//-------------------------------------------------------------------
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const keys = require("../config/keys");

// Get access to the database, 'user' collection.
const User = mongoose.model("users");

//-------------------------------------------------------------------
// 'serializeUser' & 'deserializeUser'
//-------------------------------------------------------------------
passport.serializeUser((user, done) => {
  // First argument is a `User` model
  /**
   * @param error object
   * @param info to identify the user
   */
  // 'user.id' here is not the profile id from Google. It is the '_id' from the MongoDB record.
  // The reason not to use Google id is that we may implement Facebook OAuth in the future.
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  // Search for a record
  User.findById(id).then(user => {
    done(null, user);
  });
});

//-------------------------------------------------------------------
// Google OAuth
//-------------------------------------------------------------------
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // Try to find a user with current id. Return a promise
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // We already have a record with the given id.
        // The first argument is an error object. The second argument is the user record.
        return done(null, existingUser);
      }

      // We want to create a new user.
      // Not saved to database yet if we forget '.save()'
      const user = await User({ googleId: profile.id }).save();
      done(null, user); // 'user' is the user just saved.
    }
  )
);
