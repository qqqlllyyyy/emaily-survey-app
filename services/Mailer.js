const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
// Import API key
const keys = require("../config/keys");

// 'helper.Mailer' takes lots of configurations for a mailer.
// We want to add customizations to it.
class Mailer extends helper.Mail {
  // Constructor
  // We just want the first argument to contain several properties. (Here is a survey object)
  // The second argument here is the HTML string
  constructor({ subject, recipients }, content) {
    super(); // Make sure any constructor defined on the parent class (helper.Mail) gets executed.

    this.sgApi = sendgrid(keys.sendGridKey);

    // We have to define the following properties:
    this.from_email = new helper.Email("no-reply@emaily.com");
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    // Notes that the 'recipients' input is an array of objects defined in "./routes/surveyRoutes.js"
    this.recipients = this.formatAddresses(recipients); // Helper function

    // Register the content
    // 'addContent()' is a built-in function defined in 'helper.Mail'
    this.addContent(this.body);
    // Enable click-tracking
    this.addClickTracking(); // helper function
    // Helper function to format the recipients
    // Take them into the Mailer object.
    this.addRecipients();
  }

  //---------------------------------------------------------------------------
  // Helper function
  //---------------------------------------------------------------------------
  // Extract emails for all object and format them with `helper.Email()`
  formatAddresses(recipients) {
    // When destructuring the input, add additional parenthesis: ({ email })
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  //---------------------------------------------------------------------------
  // Helper function to enable click-tracking
  //---------------------------------------------------------------------------
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  //---------------------------------------------------------------------------
  // Helper function to format the recipients
  //---------------------------------------------------------------------------
  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient); // Add them to the 'personalize' object
    });
    this.addPersonalization(personalize);
  }

  //---------------------------------------------------------------------------
  // Send it off to SendGrid
  //---------------------------------------------------------------------------
  // Sending email should be async
  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });
    const response = await this.sgApi.API(request); // Send it
    return response;
  }
}

module.exports = Mailer;
