# Server Side Architecture

### Contents

1. Relationship Between Node & Express
2. Generating Our First Express App
3. Express Route Hanlders

---

### 1. Relationship Between Node & Express

Update NPM to version 5 and install Express:
```
npm update -g
npm install --save express
```

* Node: JS runtime used to execute code outside of the browser.
* Express: A library that runs in the Node runtime. It has helpers to make dealing with HTTP traffic easier.

![01](./images/01/01-01.png "01")

Node will take the information from the HTTP request and give it to the Express side of our application. Express will then figure out where to send that incoming request to. Some response will then be generated.

---

### 2. Generating Our First Express App

We will create our first Express route handler. First created a new file `'./index.js'`. This is the root file for Node.

Note that we use `'require'` instead of `'import'`, which is common JS module rather than ES2015 module. Because at present, the NodeJS runtime only has support for common JS modules. But we will use ES2015 modules in the client side for React.

```javascript
// ./index.js
//---------------------------------------------------------
// Import Express
const express = require('express');

// Create An Express Application
// We may have several Express applications in a project.
const app = express();

// Create A Route Handler
app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

// Listen to port 5000
app.listen(5000);
```

The use of an Express application is to set up configuration that will listen for incoming requests that will be routed to the Express side from the Node side, and then route these requests to different route handlers.

Run this project:
```
node index.js
```
We can view the page by entering `localhost:5000` in the browser.

---

### 3. Express Route Hanlders

We created our first route hanlder in the last section. Let's go through it piece by piece.

![02](./images/01/01-02.png "02")

By calling `app.get()`, we are creating a brand new route handler. Express has access to several other methods as well:

* **get:** Get info from the server
* **post:** Send info to the server
* **put:** Update all the properties of something
* **delete:** Delete something
* **patch:** Update one or two properties of something

---

### 4. How to Deploy the Application

We'll use [Heroku](https://www.heroku.com/) to handle the deployment.

##### Deployment Checklist:

##### 1. **Dynamic Port Binding:** Heroku tells us which port our app will use, so we need to make sure we listen to the port they tell us to.
Whenever Heroku runs our application, it will inject the `env` variable. Modify our code to listen to a dynamic port:
```javascript
// ./index.js
//---------------------------------------------------------
// Before:
app.listen(5000);

// After:
// If there is not a variable named 'env', just use 5000.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
```

##### 2. **Specify Node Environment:** We want to use a specific version of node, so we need to tell Heroku which version we want.
Add `"engines"` property in `'./package.json'`, remember to use double quotes.
```javascript
// ./package.json
//---------------------------------------------------------
"engines": {
  "node": "8.1.1",
  "npm": "5.0.3"
},
```
##### 3. **Specify Start Script:** Instruct Heroku what command to run to start our server running.
