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

  // GET route for all funds
  app.get("/allfunds/:id", function(req, res) {
    // findAll returns all entries for a table when used with no options
    //db.fund.findAll({}).then(function(allfund) {
      // We have access to the todos as an argument inside of the callback function
      //res.json(allfund);
    //});

    db.userfund.findAll({
      where: {
        userId: req.params.id
      },
      include: [db.fund]
    }).then(function(joinFund) {
      res.json(joinFund);
    });

  });

  // POST route to add a fund
  app.post("/allfunds/add", function(req, res) {
    db.fund.create(req.body)
    .then(function(addFund) {
      res.json(addFund);
    });
  });

};
