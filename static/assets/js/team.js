$(document).ready(function(){
	var parent = $(".team-list");
	var divs = parent.children();
	while (divs.length) {
	    parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
	}
	$(".team-member-wrapper").css("visibility","visible");
});
