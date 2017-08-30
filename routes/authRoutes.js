const passport = require("../services/passport");

module.exports = (app) => {
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
}
