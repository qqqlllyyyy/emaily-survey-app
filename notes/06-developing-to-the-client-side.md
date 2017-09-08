# Developing the Client Side

### Contents

1. [Async/Await Syntax](#)
2. [Client Setup](#)
    * [Route Structures](#)
    * [React Setup](#)

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
  const json = await res.json();
  console.log(json);
}
fetchAlbums();
```

Now let's refactor our code dealing with the database. Note that `'async'` is support for node 7.6.0 or higher. We need to use `nvm` to update the node version first.

```javascript
// ./services/passport.js
//---------------------------------------------------------
passport.use(
  new GoogleStrategy(
    {...},
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
```

---

### 2. Client Setup

#### 2.1. Route Structures

Here are basic structure for some scenes:

![03](./images/06/06-03.png "03")
![04](./images/06/06-04.png "04")
![05](./images/06/06-05.png "05")

#### 2.2. React Setup

We don't want to use any boilerplate by `create-react-app`. So let's delete everything in `./client/src/` except for `'registerServiceWorker.js'`.

We'll have two root files:

* **./client/src/index.js:** Data layer control (all about `Redux`)
* **./client/src/App.js:** Rendering layer control (`React Router` related logic)

![06](./images/06/06-06.png "06")

Install some dependencies (make sure we are in the `./client/` directory):
```
cd client
npm install --save redux react-redux react-router-dom
```

Create root files:

```javascript
// ./client/src/index.js
//---------------------------------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
/**
 * @param Root component
 * @param Where we're going to render the component to inside our dom
 */
ReactDom.render();
```

Make a folder to store all the components in our application: `./client/src/components/` and create a new file `./client/src/components/App.js`.

If a given file is exporting a class or a component, we'll label it with a capital letter.
