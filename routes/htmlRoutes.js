var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/scrap", function(req, res) {
    axios.get("https://www.theonion.com/").then(function(response) {
      var scrapData = {
        data: []
      };

      var $ = cheerio.load(response.data);
      $("div.post-wrapper").each(function() {
        var result = {};
        result.title = $(this)
          .children("article")
          .children("header")
          .children("h1")
          .children("a")
          .text();
        result.link = $(this)
          .children("article")
          .children("header")
          .children("h1")
          .children("a")
          .attr("href");
        scrapData.data.push(result);
      });
      res.render("scrap", scrapData);
    });
  });

  app.get("/favorites", function(req, res) {
    db.Article.find({}).then(function(dbArticle) {
      hbsObject = {
        data: dbArticle
      };
      res.render("favorites", hbsObject);
    });
  });
};
