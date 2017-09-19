const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

// Not register this schema with mongoose, we need to export it.
module.exports = recipientSchema;
