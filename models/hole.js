//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require("./connection")

// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;


// make hole schema

const reviewSchema = new Schema({
  content: String,
  rating: {type: Number, min: 1, max: 5, default: 5}
}, {
  timestamps: true
});


const holesSchema = new Schema({
  location: String,
  severity: String,
  username: String,
  fixed: Boolean,
  reviews: [reviewSchema]

})

// make holes model
const Holes = model("Holes", holesSchema)

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Holes;