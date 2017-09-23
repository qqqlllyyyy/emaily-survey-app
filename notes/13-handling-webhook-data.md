# Handling Webhook Data

### Contents

1. [Feedback with Webhooks](#)
    * [Webhooks in Development](#)
    * [LocalTunnel Setup](#)
    * [SendGrid Setup and Testing Webhooks](#)
    * [test](#)
    * [test](#)
    * [test](#)

---

### 1. Feedback with Webhooks

#### 1.1. Webhooks in Development

Webhooks means a server make requests to another server beacuse of some event.

We now have a front-end form to send the survey and a back-end handler to accept the survey and send email. There are only two remaining features:

* Show a list of surveys in the dashboard.
* Update the database if a user clicks links in the email.

Remember the click event can be tracked by SendGrid, this time we want SendGrid to send a message to us and tell us who clicks the links.

![01](./images/13/13-01.png "01")

Here is the process. SendGrid will not send us a message once a user clicks a link, it will wait for 30 sec or 1 minute and then send us the data.

![02](./images/13/13-02.png "02")

We'll first talk about how webhooks work in production because that is a easier case, and then talk about how things break down in the dev enrivonment.

![03](./images/13/13-03.png "03")

Note that in production, SendGrid has no difficulty making a post request to our domain since it's visible to the outside world.

But for development, SendGrid can not make request to `localhost`.

![04](./images/13/13-04.png "04")

[LocalTunnel](https://localtunnel.github.io/www/) is needed to solve the problem:

We can tell SendGrid to make requests to some domain by LocalTunnel, which is a service for handling webhooks for development. The request will be forwarded to a LocalTunnel server that is running on our computer. The local server can then forward the request to `localhost`.

![05](./images/13/13-05.png "05")

#### 1.2. LocalTunnel Setup

Install `LocalTunnel` first:

```
npm install --save localtunnel
```

The create a start script to run localtunnel anytime we start the server. We need to define the port and a subdomain to receive requests:

```javascript
// ./package.json
//---------------------------------------------------------
"scripts": {
  ...
  "dev":
    "concurrently \"npm run server\" \"npm run client\" \"npm run webhook\"",
  ...
  "webhook": "lt -p 5000 -s anytextassubdomainforliyu"
},
```

We can get the following info when running our dev server again. Not that any request coming in to this url will be auto forwarded to our local machine.

![06](./images/13/13-06.png "06")

#### 1.3. SendGrid Setup and Testing Webhooks

Let's create a route handler to receive SendGrid notification and then go to SendGrid to setup the event notification:

```javascript
// ./routes/surveyRoutes.js
//---------------------------------------------------------
module.exports = app => {
  ...
  // SendGrid notification
  app.post("/api/surveys/webhooks", (req, res) => {
    console.log(req.body);
    res.send({});
  });
  ...
}
```

Then go to SendGrid dashboard: **Settings -> Mail Settings -> Event Notification**

![07](./images/13/13-07.png "07")

After clicking the test button, it seems that the `localtunnel` script appears to be crashing very often. So we use a tiny script to start `localtunnel`:

```bash
# ./sendgrid_webhook.sh
#---------------------------------------------------------
function localtunnel {
  lt -s anytextassubdomainforliyu --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
```

Don't forget to give the script execution permissions:
```
chmod +x sendgrid_webhook.sh
```

Then in the ./package.json file, use the script to run `localtunnel`:

```javascript
// ./package.json
//---------------------------------------------------------
"scripts": {
  ...
  "dev":
    "concurrently \"npm run server\" \"npm run client\" \"npm run webhook\"",
  ...
  "webhook": "./sendgrid_webhook.sh"
},
```

Now if we click the blue test button in the SendGrid console, we can have `req.body` printed in the terminal:

![08](./images/13/13-08.png "08")

In the webhook body, we have an array of different objects. Each object has an event property of the following:

* click: when a user clicks the link (this is what we want)
* bounce: email failed to send
* spamreport
* unsubscribe
* group_resubscribe

A demo object with `click` event looks like this:

```javascript
{
  email: 'example@test.com',
  timestamp: 1506070309,
  'smtp-id': '<14c5d75ce93.dfd.64b469@ismtpd-555>',
  event: 'click',
  category: 'cat facts',
  sg_event_id: 'O6aEFwXUQKbouNER11_WOQ==',
  sg_message_id: '14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0',
  useragent: 'Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
  ip: '255.255.255.255',
  url: 'http://www.sendgrid.com/'
},
```

Let's select actions in SendGrid console and finish the setup:

![09](./images/13/13-09.png "09")

We can not setup SendGrid notifications for both production and development. So we need to go back to SendGrid console and update the url before deployment.

Let's test it: send an email using our app and click the link in the email we received. The notification will appear in the terminal after a while:

![10](./images/13/13-10.png "10")

#### 1.4. Encoding Survey Data

Note that no information about the survey is in the notification, we can not know whether the user clicks 'yes' or 'no'. The only thing we get is the user's email. We need to figure out which survey the email belongs to and the user's choice.

![11](./images/13/13-11.png "11")

Here is our solution:

![12](./images/13/13-12.png "12")

So we need to update the links in the email template:

```javascript
// ./services/emailTemplates/surveyTemplate.js
//---------------------------------------------------------
`...
  <div>
    <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
  </div>
  <div>
    <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
  </div>
...`
```

Now if we test our app and click the link in the email, we can get the url with both survey id and the option in the `url` field:

![13](./images/13/13-13.png "13")

One more thing to consider: the user may click the link multiple times and we'll receive duplicate click records from SendGrid, we need to get rid of it. We also need to make sure we use records with `click` event only. That's why data pre-processing is necessary.

#### 1.5. Processing Pipeline

Here is what we may get from the SendGrid webhook:

![14](./images/13/13-14.png "14")

Only the first record should be filtered. The second one is not a `click` event, the third one is not a link to appropriate page, and the fourth one is identical to the first one.

Whenever we receive a list of records, run a `map` function for filtering. Fist we look at its `url` property. If the event has a url, just extract the right portion (e.g. `/api/surveys/1234/yes`) and we don't care about its domain. Then extract its surveyId and the choice: `{ surveyId: '1234', choice: 'yes' }`.

After the fist map function, the 2nd & 3rd records will be `undefined`:

![15](./images/13/13-15.png "15")

![16](./images/13/13-16.png "16")

![17](./images/13/13-17.png "17")
