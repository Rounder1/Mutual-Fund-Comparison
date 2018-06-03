var db = require("../models");
// Needed for server side API requests to other websites (and other HTTP requests in general)
var request = require('request');

module.exports = function (app) {

    // Get the fund's close history by that fund's symbol
    app.get("/api/newfund/:symbol", function(req, res) {
    // Get the fund symbol from the http request variable 
    var fundSymbol = req.params.symbol;
  
    // Make API call to Alpha Vantage 
    request("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" + fundSymbol + "&apikey=", (error, response, body) => {
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
  
        res.send("/index", dateRows);
      });
  });
  
};
