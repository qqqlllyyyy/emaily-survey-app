const express = require("express");

const app = express();

// Route Handler
app.get("/", (req, res) => {
  res.send({ hi: "hey you~~" });
});

// Listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT);
