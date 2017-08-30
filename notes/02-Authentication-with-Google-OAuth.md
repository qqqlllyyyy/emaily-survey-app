# Authentication with Google OAuth

### Contents

1. Intro to Google OAuth

---

### 1. Google OAuth Flow

We want to have a button 'Sign in with Google'.

![01](./images/02/02-01.png "01")
![02](./images/02/02-02.png "02")

When users clicks the login button, they will be redirected to a route like `'localhost:5000/auto/google'`. We then send the request to Google. Google will then ask the user if they grant permission.

If the user grants the permission, we can get a code from the callback url. We can send request to Google with this code and ask for some user information. The create a new record in our database with the user info.
