# Adding MongoDB

### Contents

1. Server Structure Refactor
2. Sign In Users with OAuth
    * Theory of Authentication
    * High-level Overview of the Process


---

### 1. Server Structure Refactor

Putting everything in `./index.js` is not a good idea. We can create 3 different folders and a file:

* **config:** Protected API keys and settings.
* **routes:** All route handlers, grouped by purpose.
* **services:** Helper modules and business logic.
* **index.js:** Helper modules and business logic.

Move something out from `./index.js`:

```javascript
// ./routes/authRoutes.js
//---------------------------------------------------------
// This is the initial passport module.
// Not the one created in './services/passport.js'.
const passport = require("passport");

module.exports = (app) => {
  // Google OAuth
  app.get(
    "/auth/google",
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  // Callback
  app.get(
    "/auth/google/callback",
    passport.authenticate('google')
  );
}

// ./services/passport.js
//---------------------------------------------------------
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('profile', profile);
    }
  )
);
```

We also need to import everything from `./routes/` and `./services/` to our homepage:
```javascript
// ./index.js
//---------------------------------------------------------
require("./services/passport");
// This is a function that takes our 'app' and attach two routes to it.
const authRoutes = require("./routes/authRoutes");
const app = express();
authRoutes(app);
```


Actually, we can ignore the variable `authRoutes` and simplify `./index.js`:
```javascript
// ./index.js
//---------------------------------------------------------
// Before:
const authRoutes = require("./routes/authRoutes");
const app = express();
authRoutes(app);
// After:
const app = express();
require("./routes/authRoutes")(app);
```

---

### 2. Sign In Users with OAuth

#### 2.1. Theory of Authentication

After getting the accessToken from Google, let's figure out what it really means to authenticate the user.

We communicate between our browser and our Express by HTTP request. By default, information btw requests are not shared. The token is the proof that we are the right person who made the original request. We are going to use cookie-based authentication.

![01](./images/03/03-01.png "01")

When we made the initial request, the response will have a header `'Set-Cookie'`, with the value which can uniquely identify the user. The browser will then store it in the browser's memory. The cookie will be automatically appended to any following request to the server.

#### 2.2. High-level Overview of the Process

The user will sign up first and sign out. He will sign in sometime in the future with the same email and password.

Remember we can get his Google profile when he signed up or signed in. We need to find some unique identifying token in the user's Google profile. Is that consistent between logins? Use that to decide if the user is the same. `id` from Google's profile is a good pick. That is the unique ID for this particular user, which will never change over time.

![02](./images/03/03-02.png "02")
