const keys = require("../config/keys");
// Also pass in the api key based on the stripe documentation:
// https://stripe.com/docs/api/node#create_charge
const stripe = require("stripe")(keys.stripeSecretKey);

module.exports = app => {
  // This is used in the action creator in "./client/src/actions/index.js"
  app.post("/api/stripe", async (req, res) => {
    // To test the body-parser middleware
    // console.log(req.body);

    // Take the token and make the charge
    // It returns an object of the charge just occured.
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id // This is the token from front-end request body
    });

    // Add 5 credits to the user model and save it to the database.
    // Then send the updated user to the client.
    req.user.credits += 5;
    // Saving to db is an async call. It will return the user model.
    const user = await req.user.save();
    res.send(user);
  });
};
