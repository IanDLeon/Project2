// Import Depenecies
require('dotenv').config(); // Load ENV Variables
const express = require('express'); // import express
const morgan = require('morgan'); //import morgan
const methodOverride = require('method-override');
const path = require('path');
//const mongoose = require('./models/connection')
//const productsRoute = require('./controllers/productsRoute');
const HolesRouter = require("./controllers/holes.js");
const UserRouter = require("./controllers/users.js");
const session = require("express-session")
const MongoStore = require("connect-mongo");// store data into our mongo
const reviewsRouter = require('./controllers/holes');

//! Create our Express Application Object Bind Liquid Templating Engine
const app = require('liquid-express-views')(express(), {
  root: [path.resolve(__dirname, 'views/')],
});

// Middlewares

app.use(morgan('dev')); //? logging
app.use(methodOverride('_method')); //? override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); //? parse urlencoded request bodies
app.use(express.static('public')); //? serve files from public statically
app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    saveUninitialized: true,
    resave: false,
  })
);

/////////////////////////////////////////
////////////// Routes///////////////////

app.use("/holes", HolesRouter); 
app.use("/users", UserRouter); 


app.get('/', (req, res) => {
  res.render('index.liquid')
})






// Server Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));

