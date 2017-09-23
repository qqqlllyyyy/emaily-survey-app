const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url"); // 'url' is a default module in nodejs system.
const mongoose = require("mongoose");
const reuqireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

// Access database
const Survey = mongoose.model("surveys");

module.exports = app => {
  //------------------------------------------------------------------------------
  // Fetch All Surveys by Current User
  //------------------------------------------------------------------------------
  // Don't forget to pass in the middleware 'reuqireLogin' to authenticate
  // We just don't want the surveys with their big lists of recipients.
  app.get("/api/surveys", reuqireLogin, async (req, res) => {
    // The current user is 'req.user'
    // Every survey model has a property '_user' which is the user id
    const surveys = await Survey.find({ _user: req.user.id })
      // Do not include 'recipients'
      .select({ recipients: false });
    res.send(surveys);
  });

  //------------------------------------------------------------------------------
  // Custom Page after Voting
  //------------------------------------------------------------------------------
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting.");
  });

  //------------------------------------------------------------------------------
  // SendGrid Notification
  //------------------------------------------------------------------------------
  app.post("/api/surveys/webhooks", (req, res) => {
    // Pull out just surveyId and choice
    const p = new Path("/api/surveys/:surveyId/:choice");
    // The extract process with map function
    // 'req.body' is the list of events
    /*
      const events = _.map(req.body, ({ email, url }) => {
        // Remove domain part
        const pathname = new URL(url).pathname;
        // 'p.test(pathname)' will return an object with two properties `surveyId` and `choice`.
        // If `pathname` doesn't have surveyId or choice, `match` will be null;
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      });

      // Remove 'undefined' element from an array
      const compactEvents = _.compact(events);
      // Remove duplications with same 'email' and 'surveyId'
      const uniqueEvents = _.uniqBy(compactEvents, "email", "surveyId");
      console.log(uniqueEvents);
    */

    // We can use `chain()` method and remove the temporary variables:
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      // Run query for every event in the 'events' array
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId, // Find the right survey first
            recipients: {
              // Look into its `recipients` sub-collection
              // Find one element that matches the given criteria
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            // '$inc' is a mongo operator, it allows us to put some logic inside the query.
            // '[]' here doesn't means an array, it will be translated to 'yes' or 'no'
            $inc: { [choice]: 1 }, // Increase choice ('yes' or 'no') by 1
            // Look at the `recipients` subdoc collection of the survey we just found.
            // '$' means to update just the recipient found by '$elemMatch' operator in the first argument.
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec(); // Execute the query by calling 'exec()'
      })
      .value();
  });

  //------------------------------------------------------------------------------
  // Create a New Survey
  //------------------------------------------------------------------------------
  // We can pass as many middlewares as we want
  // Make sure the user is logged in
  // Check the user have enough credits
  app.post("/api/surveys", reuqireLogin, requireCredits, async (req, res) => {
    // All the parameters for the POST request are in 'req.body'
    const { title, subject, body, recipients } = req.body;

    // Create an instance of the 'Survey' in memory (not saved yet)
    const survey = new Survey({
      title, // Equivalent to: title: title
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id, // ID generated by mongoose
      dateSent: Date.now()
    });

    // Send an email
    // Pass in survey data and the html template
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      // Save the survey and the user
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      // Send back the updated user model, so we have the updated credits
      res.send(user);
    } catch (err) {
      // '422' means unprocessible entity
      res.status(422).send(err);
    }
  });
};
