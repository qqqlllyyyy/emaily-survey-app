const keys = require("../config/keys");
// Also pass in the api key based on the stripe documentation:
// https://stripe.com/docs/api/node#create_charge
const stripe = require("stripe")(keys.stripeSecretKey);

module.exports = app => {
  // This is used in the action creator in "./client/src/actions/index.js"
  app.post("/api/stripe", (req, res) => {
    // To test the body-parser middleware
    console.log(req.body);
  });
};
