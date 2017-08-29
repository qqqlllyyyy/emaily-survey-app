const express = require("express");

const app = express();

// Route Handler
app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

// Listen to port 5000
app.listen(5000);
