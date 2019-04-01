$(document).ready(function () {
    var fruits = ["apple", "banana", "kiwi", "watermelon", "pear", "pineapple", "peach", "orange", "mango"];

        // adding buttons to a fruit array
    function renderButtons() {
        $("#fruit-buttons").empty();
        for (i = 0; i < fruits.length; i++) {
            $("#fruit-buttons").append("<button class='btn btn-success' data-fruit='" + fruits[i] + "'>" + fruits[i] + "</button>");
        }
    }

    renderButtons();

})

// Adding a button for a fruit entered
$("#add-fruit").on("click", function () {
    event.preventDefault();
    var fruit = $("#friut-input").val().trim();
    fruits.push(fruit);
    renderButtons();
    return;
});

$("button").on("click", function () {
    var fruit = $(this).attr("data-fruit");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        fruit + "r3z4IEzcPjuprm0voyIsc5a9v3hhdI5a"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        var results = response.data;
        $("#fruits").empty();
        for (var i = 0; i < results.length; i++) {
            var fruitDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var fruitImg = $("<img>");

            fruitImg.attr("src", results[i].images.original_still.url);
            fruitImg.attr("data-still", results[i].images.original_still.url);
            fruitImg.attr("data-animate", results[i].images.original.url);
            fruitImg.attr("data-state", "still");
            fruitImg.attr("class", "gif");
            fruitDiv.append(p);
            fruitDiv.append(fruitImg);
            $("#fruits").append(fruitDiv);
        }
    });
});

function changeState(){
    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");

    if (state == "still") {
        $(this).attr("src", animateImage);
        $(this).attr("data-state", "animate");
    }

    else if (state == "animate") {
        $(this).attr("src", stillImage);
        $(this).attr("data-state", "still");
    }
}