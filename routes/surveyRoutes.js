const mongoose = require("mongoose");
const reuqireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

// Access database
const Survey = mongoose.model("surveys");

module.exports = app => {
  // Create a new survey
  // We can pass as many middlewares as we want
  // Make sure the user is logged in
  // Check the user have enough credits
  app.post("/api/surveys", reuqireLogin, requireCredits, (req, res) => {
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
    mailer.send();
  });
};
