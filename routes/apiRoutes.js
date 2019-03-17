// eslint-disable-next-line no-unused-vars
var db = require("../models");
var mongoose = require("mongoose");

var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  app.get("/api/articles", function(req, res) {
    db.Article.find({}).then(function(dbArticle) {
      hbsObject = {
        data: dbArticle
      };
      console.log(hbsObject);
      res.render("articles", hbsObject);
    });
  });

  app.get("/api/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
      .then(function(dbArticle) {
        hbsObject = {
          data: [dbArticle]
        };
        console.log(hbsObject);
        res.render("articles", hbsObject);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.post("/api/articles", function(req, res) {
    db.Article.create(req.body)
      .then(function(dbArticle) {
        res.render("articles", dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });
  });

  app.put("/api/articles", function(req, res) {
    db.Article.create(req.body)
      .then(function(dbArticle) {
        res.render("articles", dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });
  });
};
