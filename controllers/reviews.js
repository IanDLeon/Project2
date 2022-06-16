//const Holes = require('../models/hole');
const Hole = require('../models/hole');

module.exports = {
  create
};

function create(req, res) {
  console.log("Review", req.body)
  Hole.findById(req.params.id, function(err, hole) {
    console.log(hole)
    hole.reviews.push(req.body);
    hole.save(function(err) {
      res.redirect(`/holes/${hole._id}`);
    });
  });
}