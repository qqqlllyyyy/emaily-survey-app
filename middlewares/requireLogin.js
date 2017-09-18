/**
 * @param req Request
 * @param res Response
 * @param next Function to call when the middleware is complete (pass the request to the next middleware of the chain)
 **/
module.exports = (req, res, next) => {
  // If not login, terminate process and return
  if (!req.user) {
    return res.status(401).send({ error: "You must log in." });
  }
  // If logged in, go to the next step
  next();
};
