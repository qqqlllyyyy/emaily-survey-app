// Regular expression to validate email.
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
  return;
};
