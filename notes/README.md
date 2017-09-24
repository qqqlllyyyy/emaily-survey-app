# Contents

### Part I. [Server Side Architecture](01-server-side-architecture.md)

1. Relationship Between Node & Express
2. Generating Our First Express App
3. Express Route Hanlders
4. How to Deploy the Application
    * Deployment Checklist
    * Actual Deployment Process
    * Subsequent Deploys

### Part II. [Authentication with Google OAuth](02-authentication-with-google-oauth.md)

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

### Part III. [Adding MongoDB](03-adding-mongodb.md)

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

### Part IV. [Dev vs Prod Environments](04-dev-vs-prod-environments.md)

1. Dev vs Prod Keys
2. Determining Environment
3. Heroku Env Variables
4. Fixing Heroku Proxy Issues

### Part V. [Moving to the Client Side](05-moving-to-the-client-side.md)

1. React App Generation
2. Running the Client and Server
3. Routing Stumbling Block
4. Why This Architecture (Optional)
    * Can We Separate the Client & Express Server
    * How Proxy Really Works

### Part VI. [Developing the Client Side - I](06-developing-to-the-client-side-i.md)

1. Async/Await Syntax
2. Client Setup
    * Route Structures
    * React Setup
    * Redux Review
    * Redux Setup
    * The Auth Reducer
3. Why We Care About Auth

### Part VII. [Developing the Client Side - II](07-developing-to-the-client-side-ii.md)

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

### Part VIII. [Handling Payments](08-handling-payments.md)

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

### Part IX. [Back End to Front End Routing in Production](09-back-end-to-front-end-routing-in-production.md)

1. Express with Create-React-App in Production
2. Routing in Production
3. Deployment Options
4. Adding in a Heroku Build Step

### Part X. [Mongoose for Survey Creation](notes/10-mongoose-for-survey-creation.md)

1. Intro to Survey
    * Survey Overview
    * Server Routes
    * Survey Model
2. Database Setup for Surveys
    * Create Mongoose Class
    * Model Deficiencies
    * Limitations of Subdocument Collections
    * Setting up SubDocs
3. Back End Setup for Surveys
    * Survey Creation Route Handler
    * Verifying Minimum Credits
    * Creating Surveys
4. Sending Emails
    * Creating Mailers
    * SendGrid Setup
    * Mailer Setup
    * Mailer in Use
    * Mailer Constructor
    * Testing Email Sending
    * Improving the Email Template
    * Polish in the Route Handler
    * Verifying SendGrid Click Tracking

### Part XI. [Client Side Surveys - I](notes/11-client-side-surveys-i.md)

1. Survey Introduction
    * Client Side Survey Creation
    * Material Icons
    * Navigation with the Link Tag
2. New Survey Form
    * Form Structure
    * Why Redux Form
    * Redux Form Setup
    * The ReduxForm Helper
    * Custom Field Components with 'SurveyField'
    * Styling the Form

### Part XII. [Client Side Surveys - II](notes/12-client-side-surveys-ii.md)

1. Form Validation
    * Validate Function
    * Showing Validation Errors
    * Generalizing Field Validation
    * Toggling Visibility
2. Form Review Page
    * Retreat to the Form
    * Persisting Form Values
    * Refactoring Form Fields
3. Submitting Form
    * Submitting the Form in the Review Page
    * Dumping Form Values
    * Posting to Surveys
    * Redirect on Submit

### Part XIII. [Handling Webhook Data](notes/13-handling-webhook-data.md)

1. Feedback with Webhooks
    * Webhooks in Development
    * LocalTunnel Setup
    * SendGrid Setup and Testing Webhooks
    * Encoding Survey Data
    * Processing Pipeline
2. Server Side Setup for Survey Results
    * Parsing the Route
    * Lodash Chain Helper
    * Checking Status and Updating Records

### Part XIV. [The Home Stretch](notes/14-the-home-stretch.md)

1. Fetching a List of Surveys
2. Displaying Surveys in the Front End
    * Wiring Surveys Up to Redux
    * Wiring React to Redux
    * Rendering a List of Surveys
