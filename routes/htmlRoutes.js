var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("http://www.echojs.com/").then(function(response) {
      var scrapData = {
        data: []
      };
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      // Now, we grab every h2 within an article tag, and do the following:
      // eslint-disable-next-line no-unused-vars
      $("article h2").each(function(i, element) {
        // Save an empty result object
        var result = {};
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");
        scrapData.data.push(result);
      });
      res.render("index", scrapData);
      // Send a message to the client
    });
  });
};
