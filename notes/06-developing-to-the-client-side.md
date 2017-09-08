# Developing the Client Side

### Contents

1. [Async/Await Syntax](#)

---

### 1. Async/Await Syntax

Before we developing the client side, let's talk about a little bit new JavaScript syntax in ES2017.

We used promises with our requests to the database in `'./services/passport.js'` to handle async request. We'll use some new syntax and refactor the code.

```javascript
// ./services/passport.js
//---------------------------------------------------------
passport.use(
  new GoogleStrategy(
    {...},
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
```

We'll write some extra test code to understand the syntax. Use the API for testing: [http://rallycoding.herokuapp.com/api/music_albums](#http://rallycoding.herokuapp.com/api/music_albums).

Whenever we make a request with `'fetch()'`, it returns a promise.

```javascript
// Write a function to retrieve a blob of json
// make an ajax request! Use the 'fetch' function available in ES6.
function fetchAlbums() {
  fetch('http://rallycoding.herokuapp.com/api/music_albums')
    .then(res => res.json())
    .then(json => console.log(json));
}
fetchAlbums();
```

To test the function, just paste into a browser console:

![01](./images/06/06-01.png "01")

The logic is as follows:

![02](./images/06/06-02.png "02")

We can refactor is using new syntax in ES2017 to make life easier working with promises.

```javascript
// The keyword 'async' tells the JS that the function contains some async code.
// Add 'await' in front of each promise.
async function fetchAlbums() {
  const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums');
  await json = res.json();
  console.log(json);
}
fetchAlbums();
```
