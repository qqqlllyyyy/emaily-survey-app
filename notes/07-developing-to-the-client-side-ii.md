# Developing the Client Side - II

### Contents

1. [React Router Setup](#)
    * [Basic Usage of React Router](#)
    * [Always Visible Components](#)

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
          {/* Route for Landing Page */}
          <Route exact path="/" component={Landing} />
          {/* Route for Landing Page */}
          <Route path="/surveys" component={Dashboard} />
        </div>
      </BrowserRouter>
    </div>
  );
};
```
