const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  // recipients: [String] // Array of strings,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 }, // How many users responded with `yes`
  no: { type: Number, default: 0 },
  dateSent: Date,
  lastResponded: Date,
  _user: { type: Schema.Types.ObjectId, ref: "User" } // The user this survey belongs to
});

// Register this schema with mongoose
mongoose.model("surveys", surveySchema);
