var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

function scrapeCompair(scrapeData) {
  console.log("articles in Scrap" + scrapeData);
  db.Article.find({ title: { $in: [scrapeData.title] } })
    .then(function(dbArticle) {
      console.log("find statment resutls" + dbArticle);
      return dbArticle;
    })
    .catch(function(err) {
      console.log(err);
    });
}

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/scrape", function(req, res) {
    axios.get("https://www.theonion.com/").then(function(response) {
      var scrapeData = {
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
        scrapeData.data.push(result);
      });
      //testing a comapir funtion.
      var compair = scrapeCompair(scrapeData.data);
      console.log("compair Var" + compair);
      res.render("scrape", scrapeData);
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
