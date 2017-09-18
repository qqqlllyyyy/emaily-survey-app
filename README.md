# React & Node Project

A full stack project with React and Node.

---

## Contents

### Part I. [Server Side Architecture](./notes/01-server-side-architecture.md)

1. Relationship Between Node & Express
2. Generating Our First Express App
3. Express Route Hanlders
4. How to Deploy the Application
    * Deployment Checklist
    * Actual Deployment Process
    * Subsequent Deploys

### Part II. [Authentication with Google OAuth](notes/02-authentication-with-google-oauth.md)

1. Intro to Google OAuth
2. Passport JS
    * What is Passport
    * Passport Setup
    * Enabling Google OAuth API
    * Securing API Keys
3. Testing OAuth
4. Access and Refresh Tokens
5. Nodemon Setup
6. Appendix

### Part III. [Adding MongoDB](notes/03-adding-mongodb.md)

1. Server Structure Refactor
2. Sign In Users with OAuth
    * Theory of Authentication
    * High-level Overview of the Process
3. MongoDB Setup
    * Introduction to MongoDB
    * Setup MongoDB and Wire It Up with Express
    * Connecting Mongoose to MongoDB
4. Working with Mongoose
    * Mongoose Model Classes
    * Saving Model Instances
    * Mongoose Queries
5. Finishing up with Authentication
    * Encoding Users
    * Enabling Cookies
    * Testing Authentication

### Part IV. [Dev vs Prod Environments](notes/04-dev-vs-prod-environments.md)

1. Dev vs Prod Keys
2. Determining Environment
3. Heroku Env Variables
4. Fixing Heroku Proxy Issues

### Part V. [Moving to the Client Side](notes/05-moving-to-the-client-side.md)

1. React App Generation
2. Running the Client and Server
3. Routing Stumbling Block
4. Why This Architecture (Optional)
    * Can We Separate the Client & Express Server
    * How Proxy Really Works

### Part VI. [Developing the Client Side - I](notes/06-developing-to-the-client-side-i.md)

1. Async/Await Syntax
2. Client Setup
    * Route Structures
    * React Setup
    * Redux Review
    * Redux Setup
    * The Auth Reducer
3. Why We Care About Auth

### Part VII. [Developing the Client Side - II](notes/07-developing-to-the-client-side-ii.md)

1. React Router Setup
    * Basic Usage of React Router
    * Always Visible Components
2. Header Component Implementation
    * Separate Header Component Out
    * Materialize CSS with Webpack
    * Header Design
3. Communication between React and Server
    * Current User API
    * Additional Proxy Rules
    * Basics of Redux Thunk
    * Import the Action Creator to Component
    * Get Communicated to the Reducers
    * Refactor the Action Creator to Async/Await
    * AuthReducer Return Values
4. After Logged In
    * Access State in Header
    * Redirecting a User on Auth
    * Redirect on Logout
    * Modify the Landing Component
    * Link in Header

### Part VIII. [Handling Payments](notes/08-handling-payments.md)

1. Client Side Billing
    * Intro and Billing Considerations
    * Stripe Billing Process
    * Stripe API Keys
    * The Payments Components
    * Reusing Action Types
2. Sever Side Billing
    * Post Request Handlers
    * Creating Charges
    * BodyParser Middleware
    * Creating a Charge Object
3. After Charging the User
    * Adding Credits to a User
    * Requiring Authentication
    * Route-Specific Middlewares
    * Displaying Credit Quantity

### Part IX. [Back End to Front End Routing in Production](notes/09-back-end-to-front-end-routing-in-production.md)

1. Express with Create-React-App in Production
2. Routing in Production
3. Deployment Options
4. Adding in a Heroku Build Step
