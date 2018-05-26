// Set up MySQL connection.
var mysql = require("mysql");
var connection;


if(process.env.JAWSDB_URL) {
    //Access Heroku env for deployment
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
 // Set up MySQL connection for local testing.
    mysql.createConnection({
        port: 3306,
        host: "localhost",
        user: "",
        password: "",
        database: "funds_db"
    });
};


// Attempt to make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});


// Export connection for our ORM to use.
module.exports = connection;
