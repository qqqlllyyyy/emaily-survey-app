const mongoose = require("mongoose");
const { Schema } = mongoose; // ES2015 version of: const Schema = mongoose.Schema;

// Define a schema, what records will look like
const userSchema = new Schema({
  googleId: String, // Define the type, 'Number' is another option.
  credits: { type: Number, default: 5 }
});

// Register this schema with mongoose
// First parameter is the name of the collection.
mongoose.model("users", userSchema);
