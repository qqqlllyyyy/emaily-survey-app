/**
 * @param req Request
 * @param res Response
 * @param next Function to call when the middleware is complete (pass the request to the next middleware of the chain)
 **/
module.exports = (req, res, next) => {
  // If no enough credits
  if (req.user.credits < 1) {
    return res.status(401).send({ error: "You don't have enough credits." });
  }

  next();
};
