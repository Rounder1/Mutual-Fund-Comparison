// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var db = require("../models");
var authController = require('../controllers/authcontroller.js');


// Routes
// =============================================================
module.exports = function (app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads view.html
    app.get('/', function (req, res) {
        res.render("index");

    });

      // GET route for getting all of the todos
  app.get("/allfunds", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.fund.findAll({}).then(function(allfund) {
      // We have access to the todos as an argument inside of the callback function
      res.json(allfund);
    });
  });

};
