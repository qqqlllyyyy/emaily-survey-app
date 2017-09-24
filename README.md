# React & Node Project

A full stack project with React and Node. It has been deployed here: [https://vast-garden-42186.herokuapp.com/](https://vast-garden-42186.herokuapp.com/).

## App Overview

This is a feedback collection application for startup owners. If you are a startup owner and you want some feedback from your customers, you can use this application to send emails requesting feedback and get tabulation of results. Your app/service can be better with valuable feedbacks!

## User Flow

Here is the app user flow:

1. User signs up via Google OAuth
2. User pays for email credits via Stripe
3. User creates a new 'campaign'
4. User enters a list of emails to send survey to
5. We send email to list of surveyees
6. Surveyees click on link in email to provide feedback
7. We tabulate feedback
8. User can see report of all survey responses

## Tech Stack

Main tech for main steps (some smaller libraries not included):

1. **User Signup:** Express Server + MongoDB + PassportJS
2. **User Payment:** Stripe + MongoDB
3. **User Create Survey:** React + Redux
4. **User Enter Emails:** React + Redux + Redux Form
5. **We Send Emails:** Email Provider (SendGrid)
6. **Surveyees Click Links:** SendGrid + Express + MongoDB

## Development Notes

The detailed list of development notes can be viewed [here](./notes).

### Part I. [Server Side Architecture](./notes/01-server-side-architecture.md)

1. Relationship Between Node & Express
2. Generating Our First Express App
3. Express Route Hanlders
4. How to Deploy the Application

### Part II. [Authentication with Google OAuth](notes/02-authentication-with-google-oauth.md)

1. Intro to Google OAuth
2. Passport JS
3. Testing OAuth
4. Access and Refresh Tokens
5. Nodemon Setup
6. Appendix

### Part III. [Adding MongoDB](notes/03-adding-mongodb.md)

1. Server Structure Refactor
2. Sign In Users with OAuth
3. MongoDB Setup
4. Working with Mongoose
5. Finishing up with Authentication

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

### Part VI. [Developing the Client Side - I](notes/06-developing-to-the-client-side-i.md)

1. Async/Await Syntax
2. Client Setup
3. Why We Care About Auth

### Part VII. [Developing the Client Side - II](notes/07-developing-to-the-client-side-ii.md)

1. React Router Setup
2. Header Component Implementation
3. Communication between React and Server
4. After Logged In

### Part VIII. [Handling Payments](notes/08-handling-payments.md)

1. Client Side Billing
2. Sever Side Billing
3. After Charging the User

### Part IX. [Back End to Front End Routing in Production](notes/09-back-end-to-front-end-routing-in-production.md)

1. Express with Create-React-App in Production
2. Routing in Production
3. Deployment Options
4. Adding in a Heroku Build Step

### Part X. [Mongoose for Survey Creation](notes/10-mongoose-for-survey-creation.md)

1. Intro to Survey
2. Database Setup for Surveys
3. Back End Setup for Surveys
4. Sending Emails

### Part XI. [Client Side Surveys - I](notes/11-client-side-surveys-i.md)

1. Survey Introduction
2. New Survey Form

### Part XII. [Client Side Surveys - II](notes/12-client-side-surveys-ii.md)

1. Form Validation
2. Form Review Page
3. Submitting Form

### Part XIII. [Handling Webhook Data](notes/13-handling-webhook-data.md)

1. Feedback with Webhooks
2. Server Side Setup for Survey Results

### Part XIV. [The Home Stretch](notes/14-the-home-stretch.md)

1. Fetching a List of Surveys
2. Displaying Surveys in the Front End
