var db = require("../models");
var mongoose = require("mongoose");
var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
module.exports = function(app) {
  // db.Article.create(result)
  //   .then(function(dbArticle) {
  //     // View the added result in the console
  //     console.log(dbArticle);
  //   })
  //   .catch(function(err) {
  //     // If an error occurred, log it
  //     console.log(err);
  //   });
};
