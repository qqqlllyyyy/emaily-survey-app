# The Home Stretch

### Contents

1. [Fetching a List of Surveys](#)
2. [Displaying Surveys in the Front End](#)
    * [Wiring Surveys Up to Redux](#)
    * [test](#)
    * [test](#)
    * [test](#)
    * [test](#)


[test](#)

---

### 1. Fetching a List of Surveys

We're almost done with the application. The last part is to display the surveys in the homepage.

The first thing is to make a route handler to respond to any request made to `/api/surveys`.

```javascript
// ./routes/surveyRoutes.
//---------------------------------------------------------
// Don't forget to pass in the middleware 'reuqireLogin' to authenticate
// We just don't want the surveys with their big lists of recipients.
app.get("/api/surveys", reuqireLogin, async (req, res) => {
  // The current user is 'req.user'
  // Every survey model has a property '_user' which is the user id
  const surveys = await Survey.find({ _user: req.user.id });
  res.send(surveys);
});
```

However, we don't want mongoose to return surveys with their `recipients` collections since we don't need them in the homepage.

We can use `#select` to include or exclude document fields. Documentations here: [Query#select](http://mongoosejs.com/docs/api.html#query_Query-select)

```javascript
// ./routes/surveyRoutes.
//---------------------------------------------------------
app.get("/api/surveys", reuqireLogin, async (req, res) => {
  const surveys = await Survey.find({ _user: req.user.id })
    // Do not include 'recipients'
    .select({ recipients: false });
  res.send(surveys);
});
```

We can test it by making a request manually in the browser console:

![01](./images/14/14-01.png "01")

---

### 2. Displaying Surveys in the Front End

#### 2.1. Wiring Surveys Up to Redux
