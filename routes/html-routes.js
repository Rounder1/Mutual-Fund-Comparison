// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get('/', function(req, res) {
      // funds.selectAll(function(data) {
          // var hbsObject = {
          //     funds : data
          // };

          // console.log("burgers_controller > get----------------------");
          // console.log(req.query);
          // // console.log(req.body);
          // console.log("req end");
          // console.log("****************************");
          // console.log(res.burgers);
          // console.log("end res");
          // console.log();


      //     res.render("index");
      // });

      res.render("index");

  });

};
