var db = require("../models");
var mongoose = require("mongoose");

var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
module.exports = function(app) {
  app.get("/api/articles", function(req, res) {
    db.Article.find({}).then(function(dbArticle) {
      hbsObject = {
        data: dbArticle
      };
      res.json(hbsObject);
    });
  });

  app.get("/api/articles/:id", function(req, res) {
    db.Article.findById(req.params.id)
      .then(function(dbArticle) {
        hbsObject = {
          data: [dbArticle]
        };
        res.JSON("favorties", hbsObject);
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  app.put("/api/articles/", function(req, res) {
    db.Article.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          title: req.body.title,
          link: req.body.title
        }
      }
    )
      .then(function(dbArticle) {
        res.render("index", dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });
  });

  app.post("/api/articles", function(req, res) {
    db.Article.create(req.body)
      .then(function(dbArticle) {
        hbsObject = {
          data: [dbArticle]
        };
        res.send(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });
  });
};
