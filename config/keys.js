// Determine whether we are in production env
// This is injected by Heroku
if (process.env.NODE_ENV === "production") {
  // We are in production
} else {
  // We are in dev env
  module.exports = require("./dev");
}
