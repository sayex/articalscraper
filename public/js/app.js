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
  $(".buttonDeleteFavorite").on("click", function() {
    var id = $(this).data("id");

    $.ajax("/api/articles/" + id, {
      type: "DELETE"
    }).then(function() {
      // console.log("changed devoured to", newDevourState);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
