const passport = require("passport");

module.exports = app => {
  // Google OAuth
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  // Callback
  app.get("/auth/google/callback", passport.authenticate("google"));

  // Test Authentication
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
    // res.send({ hi: "test" });
  });
};
