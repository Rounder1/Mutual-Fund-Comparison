"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
//var config = require(__dirname + "/../config/config.json")[env];
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var db = {};

if (process.env.JAWSDB_URL) {
    var sequelize = Sequelize(process.env.JAWSDB_URL);
} if else (config.use_env_variable) {
    console.log("index.js > RIGHT HERE");
    var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    console.log("index.js > RIGHT THERE");
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// console.log("dirname");
// console.log(__dirname);

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        console.log("----------------------------------------------");
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
        // console.log(db);
        // console.log(model);
        // console.log(db[model.name]);
        // console.log("");
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

// code before passport, replaced with top code
// Object.keys(db).forEach(function (modelName) {
//     if (db[modelName].associate) {
//         db[modelName].associate(db);
//     }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
