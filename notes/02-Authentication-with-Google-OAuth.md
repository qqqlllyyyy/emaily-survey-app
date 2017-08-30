# Authentication with Google OAuth

### Contents

1. Intro to Google OAuth
2. Passport JS
    * What is Passport
    * Passport Setup
    * Enabling Google OAuth API

---

### 1. Google OAuth Flow

We want to have a button 'Sign in with Google'.

![01](./images/02/02-01.png "01")
![02](./images/02/02-02.png "02")

When users click the login button, they will be redirected to a route like `'localhost:5000/auto/google'`. We then send the request to Google. Google will then ask the user if they grant permission.

If the user grants the permission, we can get a code from the callback url. We can send request to Google with this code and ask for some user information. The create a new record in our database with the user info.

---

### 2. Passport JS

#### 2.1. What is Passport

We're going to approach the OAuth problem with a library [Passport](http://passportjs.org/). We can use it to create the authentication flow.

Two libraries are needed to be installed:

* **passport:** General helpers for handling auth in Express apps.
* **passport strategy:** Helpers for authentication with one very specific method (email/pwd, Google, Facebook, etc).

#### 2.2. Passport Setup

Install several libraries (passport and a passport strategy named [passport-google-oauth20](https://github.com/jaredhanson/passport-google-oauth2)):
```
npm install --save passport passport-google-oauth20
```

Just put everything in './index.js' for now, and we will come back to refactor it in the future.

```javascript
// ./index.js
//---------------------------------------------------------
// Import Passport and a property from the strategy
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// Use Passport
passport.use(new GoogleStrategy());
```

#### 2.3. Enabling Google OAuth API

We need to pass some options to `GoogleStrategy`. The app has to be signed up with Google OAuth API in [https://console.developers.google.com](https://console.developers.google.com). I created a new project named `emaily-dev`.

![03](./images/02/02-03.png "03")

Then click the button `'ENABLE APIS'`. Search for 'google+' then click the `'ENABLE'` button:

![04](./images/02/02-04.png "04")
![05](./images/02/02-05.png "05")

Create credentials and create client ID:

![06](./images/02/02-06.png "06")

Configure consent screen:

![07](./images/02/02-07.png "07")
![08](./images/02/02-08.png "08")

In the end, we got two strings:

* Client ID: 900103340416-ncphrm92c4m8taktob1nm9vhj0lmspso.apps.googleusercontent.com
* Client Secret: Z1y7Z09TkpWTMY9U1J8Qa0ji

#### 2.4. Securing API Keys

The client ID is a public token, we can share this with the public. However, the client secret is a private token. How can we secure our API keys so that we will not push it to GitHub?

We can create a new file `'./config/keys.js'` to store all sensitive keys.

```javascript
// ./config/keys.js
//---------------------------------------------------------
module.exports = {
  googleClientID: '900103340416-ncphrm92c4m8taktob1nm9vhj0lmspso.apps.googleusercontent.com',
  googleClientSecret: 'Z1y7Z09TkpWTMY9U1J8Qa0ji'
};
// ./.gitignore
//---------------------------------------------------------
node_modules
keys.js
```

Finally, we can import the keys and pass them into `GoogleStrategy()`:
```javascript
// ./index.js
//---------------------------------------------------------
const keys = require('./config/keys');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    accessToken => {
      console.log(accessToken);
    }
  )
);
```