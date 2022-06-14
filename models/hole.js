//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require("./connection")

// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;


// make hole schema

const holesSchema = new Schema({
  location: String,
  severity: String,
  username: String,
  fixed: Boolean

})

// make holes model
const Holes = model("Holes", holesSchema)

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Holes;