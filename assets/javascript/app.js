$(".gifimage").on("click", function () 
	{
		console.log("Ok");
		$(this).css("transform", "rotate(" + Math.floor(Math.random() * 3600) + "deg)");
	});