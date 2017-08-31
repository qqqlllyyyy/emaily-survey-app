# Adding MongoDB

### Contents

1. Server Structure Refactor


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
