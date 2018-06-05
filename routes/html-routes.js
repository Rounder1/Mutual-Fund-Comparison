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
  app.get("/allfunds/all", function(req, res) {

    db.fund.findAll({}).then(function(allFunds) {
      res.json(allFunds);
    });
  });

  // POST route to add a fund
  app.post("/allfunds/add", function(req, res) {
    db.fund.create(
      {
        fund_name: req.body.fund_name,
        symbol: req.body.fund_symbol,
        expense_ratio: parseFloat(req.body.expense_ratio)
      }
    ).then(function(addFund) { // just delete the promise half
        res.send(addFund); // just delete the promise half
    }); // just delete the promise half
  });

};
