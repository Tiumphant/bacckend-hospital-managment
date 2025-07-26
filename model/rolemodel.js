
// Import mongoose
const mongoose = require("mongoose");

// Define the schema
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique:true
  },
  description: {
    type: String,
  }
});
module.exports = mongoose.model("Role", roleSchema);