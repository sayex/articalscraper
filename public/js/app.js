$(function() {
  $(".buttonArticles").on("click", function() {
    var title = $(this).data("title");
    var link = $(this).data("link");
    var favoriteArticle = {
      title: title,
      link: link
    };

    $.ajax("/api/articles/", {
      type: "POST",
      data: favoriteArticle
    }).then(function(response) {
      // console.log("changed devoured to", newDevourState);
      // Reload the page to get the updated list
      console.log(response);
    });
  });
});
