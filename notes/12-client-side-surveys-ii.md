# Client Side Surveys - II

### Contents

1. [Form Validation](#)
    * [Validate Function](#)
    * [Showing Validation Errors](#)
    * [Generalizing Field Validation](#)
    * [aaaaa](#)
    * [aaaaa](#)
    * [aaaaa](#)

---

### 1. Form Validation

#### 1.1. Validate Function

When the user enters emails in the form, we should validate the emails as soon as possible. Let's dive in the validation in `redux-form`.

We can pass in another attribute when exporting the `SurveyForm` component, which is `validate`. It will run whenever the form is submitted. If the returned value from the `validate` function is an empty object, `redux-form` assumes the entire form is valid.

```javascript
// ./client/src/components/surveys/SurveyForm.js
//---------------------------------------------------------
/**
 * Validation Function
 * @param values: contains all the values from the form
 **/
function validate(values) {
  // We return an error object.
  // If the returned object is empty, 'redux-form' assumes that the entire form is valid.
  const errors = {};
  // If no title is provided
  if (!values.title) {
    errors.title = "You must provide a title.";
  }
  return errors;
}
// It takes only one argument object with the configurations how we want the form to behave.
export default reduxForm({
  validate,
  form: "surveyForm"
})(SurveyForm);
```

#### 1.2. Showing Validation Errors

The complicated part here is how to show the error to the user. When we returned the error object from the validation function, `redux-form` will look into the object. If any property name of the object matches up with the fields rendered. It will automatically take the error and pass it as a prop to our custom `Field` component.

To use that prop, pass another argument `meta` into our `SurveyField` component:

```javascript
// ./client/src/components/surveys/SurveyField.js
//---------------------------------------------------------
export default ({ input, label, meta }) => {
  console.log(meta);
  ...
};
```

We can the access the error message as `meta.error`:

![01](./images/12/12-01.png "01")

Thus we can show the error message until the user touches the input:

```javascript
// ./client/src/components/surveys/SurveyField.js
//---------------------------------------------------------
// 2-level destruction
export default ({ input, label, meta: { error, touched } }) => {
  console.log(meta);
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error} // If 'touched' is true, print the error
      </div>
    </div>
  );
};
```

We can then see the error message after clicked the input:

![02](./images/12/12-02.png "02")

#### 1.3. Generalizing Field Validation

We now have the error message. The validation logic is the same for the first 3 fields, but we need a list of valid emails for the last one `recipients`.

```javascript
// ./client/src/components/surveys/SurveyForm.js
//---------------------------------------------------------
function validate(values) {
  const errors = {};
  // If no content is provided
  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}.`;
    }
  });
  return errors;
}
```

To validate email, let's make a new function which is visible to the entire application since we may want to reuse it: `./client/src/utils/validateEmails.js`. Here is the workflow:

![03](./images/12/12-03.png "03")

Email validation regular expression for different languages can be viewed in [Email Regex](http://emailregex.com/).

```javascript
// ./client/src/utils/validateEmails.js
//---------------------------------------------------------
// Regular expression to validate email.
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
1
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Export a function to validate emails
// It takes a string of emails and return a list of emails
export default emails => {
  const invalidEmails = emails
    .split(",")
    .map(email => email.trim())
    // If it's valid, return false, if it's invalid, return true
    // So that we can keep invalid emails.
    .filter(email => !re.test(email));
  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }
};
```

Then import the validate function for emails:


```javascript
// ./client/src/components/surveys/SurveyForm.js
//---------------------------------------------------------
import validateEmails from "../../utils/validateEmails";
function validate(values) {
  const errors = {};
  // Check emails
  // Provide an empty string if no email is entered.
  errors.emails = validateEmails(values.emails || '');
  // Check empty input
  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}.`;
    }
  });
  return errors;
}
```

#### 1.4. Toggling Visibility

Now we have the validation function to validate user's input. We want `SurveyFormReview` to show after the user submits the form.

![04](./images/12/12-04.png "04")

We have 3 options to do that, let's talk about pros and cons:
