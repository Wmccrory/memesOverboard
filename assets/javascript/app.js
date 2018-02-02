//memes overboard//////////////////////////////////////////////////////////////

//variable bank///////////////////////////////////////////////////////////////

memeArray =
[
"smoking crab",
"cool lobster",
"crazy seahorse",
]

//var a; //Temporary variable to render buttons from memeArray
var memeHold; //variable pushing user entry into memeArray
var memeCall; //variable making API call
var queryUrl; //url mixed with memeCall to make ajax call
var animation;
var state

//function bank/////////////////////////////////////////////

function buttonRender ()
	{
		$("#buttonDisplay").empty();
		for (i=0; i<memeArray.length; i++)
			{
				var a = $("<button>");
				a.addClass("meme");
				a.attr("dataName", memeArray[i]);
				a.text(memeArray[i]);
				$("#buttonDisplay").append(a);
			}
	}

function userMemeEntry ()
	{
		memeHold = $("#memeSearch").val().trim();
		if (memeArray.length >= 7)
		{
			memeArray = [];
			alert("Your previous contraband has sunk! Keep dumping!");
			buttonRender();
		}
		else if (memeHold.length <= 0)
		{
			alert("Add the damn meme before unloading it!");
		}
		else
		{
		memeArray.push(memeHold);
		buttonRender();
		}
	}

function memeClick ()
{
	queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + memeCall + "&api_key=HlEjuHx3lHWzMbqf3OqvY4znmnCFHOsX"
	$.ajax
	({
		url: queryUrl,
		method: "GET"
	})
	.then(function(response) 
	{
	var results = response.data;
	console.log(results);
	for (var i=0; i < 10; i++)
	{
		var gifDiv = $("<div class='gifimage'>");
		var rating = results[i].rating;
		var p = $("<p class='rating'>").text(rating);
		var gifImage = $("<img class='gifimage'>");
		gifImage.attr("src", results[i].images.downsized_still.url);
		gifImage.attr("data-still", results[i].images.downsized_still.url);
		gifImage.attr("data-animate", results[i].images.downsized.url);
		gifImage.attr("data-state", "still");
		gifDiv.append(p);
		gifDiv.append(gifImage);

		$("#contentDisplay").prepend(gifDiv);
		$(gifDiv).css("transform", "rotate(" + Math.floor(Math.random() * 360) + "deg)");
	}
	});
}

//modal
$("#close").click(function() {
	$("#modalBackground").fadeOut(1000);
});

$("#modalBackground").click(function() {
	$("#modalBackground").fadeOut(1000);
});

//site progression///////////////////////////////////////
window.onload = function() 
{
	buttonRender()
}

$("#memeEnter").on("click", function(event) 
	{
		event.preventDefault()
		userMemeEntry()
	});

$(document).on("click", ".meme", function()
	{
		$("#contentDisplay").empty()
		memeCall = $(this).attr("dataname");
		memeClick()
	});

$(document).on("click", ".gifimage", function ()
	{
		state = $(this).attr("data-state");
		console.log(state);
		if (state === "still")
		{
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).css("transform", "rotate(" + Math.floor(Math.random() * 3600) + "deg)");
			$(this).attr("data-state", "animate");
		}
		else
		{
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	});