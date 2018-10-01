$(document).ready(function () {
    var buttons = ["Waiting", "Thanks", "Shocked", "Nope", "Laughing", "Thumbs Up", "Popcorn", "Good Luck", "Eye Roll", "Animals", "Classic", "Congratulations"]

    function renderButtons() {
        $("#buttons-view").empty();

        for (i=0; i<buttons.length; i++) {
            var a = $("<button>");
            a.addClass("reaction-btn");
            a.attr("data-reaction", buttons[i])
            a.text(buttons[i]);
            $("#buttons-view").append(a);
        }
    }

    $("#add-creation").on("click", function(event){
        event.preventDefault();
        var newButton = $("#creation-input").val().trim();
        buttons.push(newButton)
        renderButtons();
    })

    $(document).on("click", ".reaction-btn", displayGifs);


    function displayGifs() {
        var reaction = $(this).attr("data-reaction");
  
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + reaction + "&api_key=dc6zaTOxFJmzC&limit=10";
  
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            $("#gifs-appear-here").empty();
            console.log(queryURL);
  
            console.log(response);
            var results = response.data;
  
            for (var i = 0; i < results.length; i++) {
  
                var reactionDiv = $("<div>");
    
                var p = $("<p>").text("Rating: " + results[i].rating);
    
                var reactionImage = $("<img>");
                reactionImage.attr("src", results[i].images.fixed_height_still.url);
                reactionImage.attr("data-animate", results[i].images.fixed_height.url);
                reactionImage.attr("data-still", results[i].images.fixed_height_still.url);
                reactionImage.attr("data-state", "still");
                reactionImage.attr("class", "gif")
    
                reactionDiv.prepend(p);
                reactionDiv.prepend(reactionImage);
    
                $("#gifs-appear-here").prepend(reactionDiv);
            }
            
            $(".gif").on("click", function() {
                console.log("meow")
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    };

    renderButtons();

});