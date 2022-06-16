////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Holes = require("../models/hole.js");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const res = require("express/lib/response");
// add user to req.body to track related user



////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
  //console.log(req.session) 
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/user/login");
  }
});

/////////////////////////////////////////
// Routes
/////////////////////////////////////////


// new route
router.get("/new", (req, res) => {
  res.render("holes/new.liquid");
});



// index route
router.get("/", async (req, res) => {
  // find all the holes
  Holes.find({ /*username: req.session.username*/ })
    // render a template after they are found
    .then((holy) => {
      //console.log(holy);
      res.render("holes/index.liquid", { holy });
    })
    // send error as json if they aren't
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// create route
router.post("/", (req, res) => {
  // check if the fixed property should be true or false
  req.body.fixed = req.body.fixed === "on" ? true : false;
  req.body.username = req.session.username
  // create the new fruit
  Holes.create(req.body)
      .then((holy) => {
          console.log(holy)
        // redirect user to index page if successfully created item
          res.redirect("/holes");
      })
      // send error as json
      .catch((error) => {
          console.log(error);
          res.json({ error });
      });
});


// show route
router.get("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;

  // find the particular fruit from the database
  Holes.findById(id)
      .then((holy) => {
          // render the template with the data from the database
          res.render("holes/show.liquid", { holy });
      })
      .catch((error) => {
          console.log(error);
          res.json({ error });
      });
});

//update route
router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // check if the fixed property should be true or false
  req.body.fixed = req.body.fixed === "on" ? true : false;
  // update the hole
  Holes.findByIdAndUpdate(id, req.body, { new: true })
      .then((holy) => {
          // redirect to main page after updating
          res.redirect("/holes");
      })
      // send error as json
      .catch((error) => {
          console.log(error);
          res.json({ error });
      });
});

router.delete("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the hole
  Holes.findByIdAndRemove(id)
      .then((holy) => {
          // redirect to main page after deleting
          res.redirect("/holes");
      })
      // send error as json
      .catch((error) => {
          console.log(error);
          res.json({ error });
      });
});

// edit route
router.get("/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the hole from the database
  Holes.findById(id)
      .then((holy) => {
          // render edit page and send hole data
          res.render("holes/edit.liquid", { holy });
      })
      // send error as json
      .catch((error) => {
          console.log(error);
          res.json({ error });
      });
});

//update route
router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // check if the fixed property should be true or false
  req.body.fixed = req.body.fixed === "on" ? true : false;
  // update the holes
  Holes.findByIdAndUpdate(id, {location: req.body.location}, { new: true })
      .then((holy) => {
        console.log("test", holy)
        // redirect to main page after updating
          res.redirect("/holes");
      })
      // send error as json
      .catch((error) => {
          console.log(error);
          res.json({ error });
      });
});

/// Reviews
router.post('/:id/reviews', reviewsCtrl.create)

// route
router.get("/:id/reviews", (req, res) => {
  // get the id from params
  const id = req.params.id;

  // find the particular hole from the database
  Holes.findById(id)
      .then((holy) => {
          // render the template with the data from the database
          res.render("holes/show.liquid", { holy });
      })
      .catch((error) => {
          console.log(error);
          res.json({ error });
      });
});





//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;

