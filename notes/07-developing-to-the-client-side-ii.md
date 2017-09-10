# Developing the Client Side - II

### Contents

1. [React Router Setup](#user-content-1-react-router-setup)
    * [Basic Usage of React Router](#user-content-11-basic-usage-of-react-router)
    * [Always Visible Components](#user-content-12-always-visible-components)
2. [Header Component Implementation](#user-content-2-header-component-implementation)
    * [Separate Header Component Out](#user-content-21-separate-header-component-out)
    * [Materialize CSS with Webpack](#user-content-22-materialize-css-with-webpack)
    * [Header Design](#user-content-23-header-design)
3. [Communication between React and Server](#)
    * [Current User API](#)
    * [Additional Proxy Rules](#)

---

### 1. React Router Setup

#### 1.1. Basic Usage of React Router

Based on the route a user is visiting, we want to show different components on the screen. For example, we want to show `Header` and `Landing` components in the landing page:

![01](./images/07/07-01.png "01")

So we'll setup several different routes in our application. A route is a pairing or a rule between the address that the user is looking at and the components that should be displayed.

Remember `./client/src/components/App.js` is responsible for all the view-layer setup.

```javascript
// ./client/src/components/App.js
//---------------------------------------------------------
// BrowserRouter: Brain of react-router, it tells react-router how to behave.
// Route: A react component to setup a rule btw a certain route and some components to be displayed.
import { BrowserRouter, Route } from 'react-router-dom';
// Use some dummy components for now
const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;
// We'll leave the outside 'div' for further css purpose.
// Note that 'BrowserRouter' expects to have at most one child. So we need a 'div' in it.
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          {/* Route for Landing Page */}
          <Route path="/" component={Landing} />
        </div>
      </BrowserRouter>
    </div>
  );
};
```

#### 1.2. Always Visible Components

We can use the same way described above to add two new routes for survey and dashboard.

```javascript
// ./client/src/components/App.js
//---------------------------------------------------------
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          {/* Route for Landing Page */}
          <Route path="/" component={Landing} />
          {/* Route for Landing Page */}
          <Route path="/surveys" component={Dashboard} />
        </div>
      </BrowserRouter>
    </div>
  );
};
```

If we go to [http://localhost:3000/surveys](http://localhost:3000/surveys), both the Landing and Dashboard components will be displayed.

The reason is straight-forward: Whenever react-router decides what set of components to be displayed, it will take current url and try to match every single route to the current route. So `'/'` is contained in `'/surveys'`. We can pass in `exact` into the `Route` tag to avoid this.

```javascript
// ./client/src/components/App.js
//---------------------------------------------------------
// Pass 'exact' is the same as: exact="true"
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          {/* Header will always be displayed */}
          <Header />
          {/* Route for Landing Page */}
          <Route exact path="/" component={Landing} />
          {/* Route for Dashboard */}
          <Route exact path="/surveys" component={Dashboard} />
          {/* Route for New Survey Page */}
          <Route path="/surveys/new" component={SurveyNew} />
        </div>
      </BrowserRouter>
    </div>
  );
};
```

We'll break the `Header` component out to a separate component and make sure we can decide whether or not the user is logged in.

---

### 2. Header Component Implementation

#### 2.1. Separate Header Component Out

Instead of use a dummy variable in `'./client/src/components/App.js'`, let's create a separate file `./client/src/components/Header.js` and create a class-based component.

We just want a class-based component since we don't need to use component-level state here and a functional-based component might be messy.

```javascript
// ./client/src/components/Header.js
//---------------------------------------------------------
import React, { Component } from 'react';
class Header extends Component {
  render() {
    return <div>Header</div>;
  }
}
export default Header;
```

Let's then import it in ./client/src/components/App.js and replace our dummy variable:
```javascript
// ./client/src/components/App.js
//---------------------------------------------------------
import Header from './Header';
```

#### 2.2. Materialize CSS with Webpack

[Materialize CSS](http://materializecss.com/) is a famous CSS framework by any type of front-end JS framework. Note that the JavaScript part of Materialize CSS might not work properly with React. We can also use other frameworks like [Material-UI](http://www.material-ui.com/#/). But `Material-UI` uses javascript-based styling, which is not easy to change the layout. So we choose `Materialize CSS`.

Lets install `Materialize CSS` using `npm` instead of a `link` tag: [http://materializecss.com/getting-started.html](http://materializecss.com/getting-started.html).

```
cd client
npm install --save materialize-css
```

When we created our project with `create-react-app` we automatically got some infrastructure inside our project that configures and makes use of webpack, which is a `module loader`.

Webpack can concatenate all the files together and arrange these files into very few generated files.

![02](./images/07/07-02.png "02")

We want to use `./client/node_modules/materialize-css/dist/css/materialize.min.css`. Write an import statement in our `./client/src/index.js` file and `Webpack` will notice that we want to include a css file. It will then generate a css file.

```javascript
// ./client/src/index.js
//---------------------------------------------------------
// Webpack assumes you'll specify a npm_module installed in './client/npm_modules/'
import "materialize-css/dist/css/materialize.min.css";
```

#### 2.3. Header Design

We now included materialize css in our application. Let's design our header.

```javascript
// ./client/src/components/Header.js
//---------------------------------------------------------
class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">Emaily</a>
          <ul className="right">
            <li>
              <a>Login With Google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
```
Our application header looks better:

![03](./images/07/07-03.png "03")

Added a container class to the outside div:
```javascript
// ./client/src/components/App.js
//---------------------------------------------------------
const App = () => {
  return (
    <div className="container">
      ...
  );
};
```
---

### 3. Communication between React and Server

#### 3.1. Current User API

Header component should display different content if a user is logged in or not logged in. Remember we have a route in our Express server file `./routes/authRoutes.js`:

If a user is logged in, the route `/api/current_user` will response with the user signed in. This is the way to figure out whether a user is signed in.

When the application boosts up, we'll make a request to the route `/api/current_user` to see whether or not the user is logged in.

Here is diagram of how to communicate between our React app and the server side:

![04](./images/07/07-04.png "04")

So we need to make an action creator that makes a request over to the route handler on our server.

#### 3.2. Additional Proxy Rules

Here is a diagram of how to figure out whether a user is signed in:

1. When React app started, the App component should call an action creator.
2. The action creator should make an ajax request to the backend asking whether or not a user is logged in.
3. The action creator has a name `'fetchUser'`, we'll use `axios` to make the request.
4. Once we get the request back, we'll use a library `'redux-thunk'` to dispatch an action off to all the different reducers in our app.
5. Our `authReducer` will look at that action and update the state.
6. Update `Header` component based on the new state.

![05](./images/07/07-05.png "05")

Install `axios` to make ajax requests:

```
cd client
npm install --save axios redux-thunk
```

Import `redux-thunk` into `./client/src/index.js` and use it as a middleware to create the redux store:
```javascript
// ./client/src/index.js
//---------------------------------------------------------
import reduxThunk from 'redux-thunk';
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
```

Create a new folder storing all our action creators: `./client/src/actions/`:

* `./client/src/actions/index.js`: To organize all our action creators in the folder. (We'll refactor it later)
* `./client/src/actions/types.js`: Store all action types

```javascript
// ./client/src/actions/types.js
//---------------------------------------------------------
export const FETCH_USER = "fetch_user";

// ./client/src/actions/index.js
//---------------------------------------------------------
import axios from 'axios';
import { FETCH_USER } from './types';
const fetchUser = () => {
  axios.get('/api/current_user');
};
```

We need another proxy rule to handle to request to the route `'/api/current_user'`.

```javascript
// ./client/package.json
//---------------------------------------------------------
...
"proxy": {
  "/auth/google": {
    "target": "http://localhost:5000"
  },
  "/api/*": {
    "target": "http://localhost:5000"
  }
},
...
```
