const mongoose = require("mongoose");
const { Schema } = mongoose;

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [String] // Array of strings,
  yes: { type: Number, default: 0 }, // How many users responded with `yes`
  no: { type: Number, default: 0 }
});

mongoose.model("surveys", surveySchema);
