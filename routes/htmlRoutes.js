var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    axios.get("http://www.echojs.com/").then(function(response) {
      var scrapData = {
        data: []
      };
      var $ = cheerio.load(response.data);
      // eslint-disable-next-line no-unused-vars
      $("article h2").each(function(i, element) {
        var result = {};
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");
        scrapData.data.push(result);
      });
      res.render("index", scrapData);
    });
  });

  app.get("/favorites", function(req, res) {
    db.Article.find({}).then(function(dbArticle) {
      hbsObject = {
        data: dbArticle
      };
      console.log(hbsObject);
      res.render("articles", hbsObject);
    });
  });
};
