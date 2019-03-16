module.exports = function(app) {
  app.get("/", function(req, res) {
    var hbsObject = {
      msg: "Hello World"
    };
    res.render("index", hbsObject);
  });
};
