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
      $("article.cw4lnv-0").each(function() {
        var result = {};
        result.title = $(this)
          .children("div")
          .children("div")
          .children("div")
          .children("a")
          .text();
        result.link = $(this)
          .children("div")
          .children("div")
          .children("div")
          .children("a")
          .attr("href");
        scrapeData.data.push(result);
      });
      $("article.sc-3kpz0l-0").each(function() {
        var result = {};
        result.title = $(this)
          .children("div")
          .children("div")
          .children("a")
          .text();
        result.link = $(this)
          .children("div")
          .children("div")
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
    db.Article.find()
      .sort({ _id: -1 })
      .then(function(dbArticle) {
        hbsObject = {
          data: dbArticle
        };
        res.render("favorites", hbsObject);
      });
  });
};
