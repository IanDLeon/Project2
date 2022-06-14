// import dependencies 
const mongoose = require('./connection');
const Product = require('./hole');

// Seed Code
const db = mongoose.connection;

// Make sure code is not run till connected

db.on("open", () => {

const startHoles = [
  { username: "IanDLeon", location: "Brooklyn", severity: "Bad", fixed: false},
  { username: "Indi", location: "Brooklyn", severity: "Bad", fixed: false},
  { username: "Puchito", location: "Long Island", severity: "Bad", fixed: false},
]
// delete all products
Product.deleteMany({})
.then((deletedProducts)=> {
  Product.create(startHoles)
  .then((seededHoles)=> {
    console.log(seededHoles)
    db.close()
  })
  .catch((error) => {
    console.log(error);
    db.close();
  });
})
  .catch((error) => {
    console.log(error);
    db.close();
});
// seed code above.

})