# Server Side Architecture

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

### 2. Generating Express App

We will create our first Express route handler. First created a new file `'./index.js'`. This is the root file for Node.

Note that we use `'require'` instead of `'import'`, which is common JS module. Because at present, the NodeJS runtime only has support for common JS modules.

```javascript
// ./index.js
// Import Express
const express = require('express');
```
