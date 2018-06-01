// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var passport   = require('passport');
var session    = require('express-session');
var bodyParser = require("body-parser");
var env = require('dotenv').load();
// Set Handlebars
var exphbs = require('express-handlebars');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
// init parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json());

//Initialize passport
// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Static directory
app.use(express.static("public"));

// Initialize handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
var authRoute = require('./routes/auth.js')(app);

//Models
var models = require("./models");

//Sync Database
models.sequelize.sync().then(function() {

    console.log("");
    console.log('Nice! Database looks fine');

}).catch(function(err) {

    console.log("");
    console.log(err, "Something went wrong with the Database Update!")

});

// Start our express app aka run server
app.listen(PORT, function(err) {

    if (!err) {
        console.log("Site is live on PORT " + PORT);
        console.log("");
    } else {
        console.log(err);
    }

});
