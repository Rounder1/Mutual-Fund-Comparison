var express = require("express");

// Needed for server side API requests to other websites (and other HTTP requests in general)
var request = require('request');
// Import API Keys
var keys = require("../keys.js");
var alphaVantageKey = keys.alphaVantage.key;

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var cat = require("../models/cat.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  cat.all(function(data) {
    var hbsObject = {
      cats: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});


// Get the fund's close history by that fund's symbol
router.get("/api/newfund/:symbol", function(req, res) {
  // Get the fund symbol from the http request variable 
  var fundSymbol = req.params.symbol;

  // Make API call to Alpha Vantage 
  request("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" + fundSymbol + "&apikey=" + alphaVantageKey, (error, response, body) => {
      // Prints an error or returns null if none occur
      console.log('error:', error);
      // Prints the response status code 
      console.log('statusCode:', response && response.statusCode); 
      // Parses the JSON returned by the API
      var fundInfo = JSON.parse(body);
      // Pull the history of the fund by month out of the parsed body object
      var timeSeries = fundInfo["Monthly Time Series"];
      // Array that contains useable financial history in decimal form
      var dateRows = [];

      // loops through each month in the timeSeries object and pushes the result to the dateRows array so that it is easy to work with
      for (var keys in timeSeries) {

          if (timeSeries[keys]) {
              var finData = timeSeries[keys];
              var close = parseFloat(finData["4. close"]);           
            
              // pushs the data, only sending the date and close price 
              dateRows.push({
                  date: keys,
                  close
              });
          }
      }

      res.send(dateRows);
    });
});


router.post("/api/cats", function(req, res) {
  cat.create([
    "name", "sleepy"
  ], [
    req.body.name, req.body.sleepy
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/cats/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  cat.update({
    sleepy: req.body.sleepy
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/cats/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  cat.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
