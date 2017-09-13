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
  // Added the 3rd argument, where the request to send to after passport middleware
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      // Redirect the user to the dashboard after logged in
      res.redirect("/surveys");
    }
  );

  // Logout
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Test Authentication
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
    // res.send({ hi: "test" });
  });
};
