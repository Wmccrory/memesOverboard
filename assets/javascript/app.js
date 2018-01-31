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
		gifDiv.append(p);
		gifDiv.append(gifImage);

		$("#contentDisplay").prepend(gifDiv);
		$(gifDiv).css("transform", "rotate(" + Math.floor(Math.random() * 360) + "deg)");

		$(".gifimage").on("click", function () 
	{
		console.log("test");
		$(this).css("transform", "rotate(" + Math.floor(Math.random() * 3600) + "deg)");
	});
	}
	});
}	

//rotation mechanics///////////////////////////////////////
// $(".gifimage").on("click", function () 
// 	{
// 		console.log("test");
// 		$(this).css("transform", "rotate(" + Math.floor(Math.random() * 3600) + "deg)");
// 	});

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
	})