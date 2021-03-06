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
      if (response.title === title) {
        $("button[data-title='" + title + "']")
          .parent()
          .remove();
      }
    });
  });
  $(".buttonDeleteFavorite").on("click", function() {
    var id = $(this).data("id");

    $.ajax("/api/articles/" + id, {
      type: "DELETE"
    }).then(function() {
      location.reload();
    });
  });
  $(".buttonNote").on("click", function() {
    var id = $(this).data("id");
    $.ajax("/api/notes/" + id, {
      type: "GET"
    }).then(function(response) {
      $("#modal").empty();
      $("#modal").html(response);
      $("#myModal").modal({
        show: true
      });
    });
  });
  $(document).on("click", ".noteDelete", function() {
    var id = $(this).data("id");

    $.ajax("/api/notes/" + id, {
      type: "DELETE"
    }).then(function(response) {
      console.log(response);
      $("li[data-id='" + id + "']").remove();
    });
  });
  $(document).on("click", ".noteSave", function() {
    var id = $(this).data("id");
    var noteVal = $("#message-text")
      .val()
      .trim();
    var newNote = {
      text: noteVal
    };

    $.ajax("/api/notes/" + id, {
      type: "POST",
      data: newNote
    }).then(function(response) {
      var id = response.article;
      var text = response.text;

      var newNote = `<li data-id=${id}>${text} <button type="button" class="btn btn-danger btn-sm noteDelete" data-id=${id}>x</button>
      </li>`;

      $("#ulNotes").append(newNote);
      $("#message-text").val("");
    });
  });
});
