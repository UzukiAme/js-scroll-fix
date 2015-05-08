function centerFixedMenu() {
	//Vertical center when scrolling
	var item = document.querySelector('.menu-item'),
	  search = document.getElementById('searchform'),
	  fixedHeader,
	  fixedHeaderHeight,
	  searchHeight = search.offsetHeight;
	//if the menu is fixed at the top of the screen (fixed-header class exists)
	if($('#headerwrap').hasClass('fixed-header')) {
		//get the header
		fixedHeader = document.querySelector('.header-on-scroll');
		//get the height of the header
		fixedHeaderHeight = fixedHeader.offsetHeight;
		//Set search position
		$(search).css({
			position: "relative",
		});
	} else {
		//set the search field back to static when fixed-header class is removed by the theme
	 	$(search).css({position: "static"});
		}
	//Horizontal center on pages other than the homepage
	//if the fixed-header class does not exist
	if(!$('#headerwrap').hasClass('fixed-header')) {
		//menu item positions should be static
		$('#main-nav li').css({position: "static"});
	} else {
		//if the header is fixed 
		//get the width of all the menu items together
		var itemsWidth = 0;
		//loop through the menu items adding the width of each one to the total width
		$('#main-nav').children().each(function() {
			itemWidth = $(this).width();
			itemsWidth += itemWidth;
			return itemsWidth;
		});
		//loop through each menu item and set the position and left properties
		navWidth = $('.fixed-header').width();
		$('#main-nav').children().each(function() {
			$(this).css({
				//because the elements are offset from their original positions, moving each one left the same amount will leave the line in tact.
				position: "relative",
				left: function() {
				//left offset for each is the width of the nav bar minus the combined widths of the items
					return ((navWidth/2)-(itemsWidth/2)) + "px";
				}//end left value function
			});//end css method
		});//end each function
	}
}


window.onscroll = function() {
 	centerFixedMenu();
}
window.onload = function() {
	centerFixedMenu();
}



function scrollAnimate() {
	var newID,
	  url,
	  anchorRegEx,
	  anchor,
	  rowClass,
	  rowOffsetTop,
	  contentTop,
	  newHref,
	  menuOffset;
	//if on the home page (right after page load from a different page on the site)
	if($('body').hasClass('home')) {
		//prevent scrolling when page loads
		window.onload = function(e){
			e.preventDefault();
		}
		//get current url, with anchor on the end
		url = window.location.href,
		//regular expression to get the anchor from the url
		anchorRegEx = /(#.+)/;
		//if there is an anchor in the url
		if(anchorRegEx.exec(url) != null) {
			//get the anchor from the url
			anchor = anchorRegEx.exec(url)[1],
			//get the corresponding class from the body of the page
			rowClass = "." + anchor.slice(1),
			//find the y cooridnate of the correct row (minus compensation for the menu)
			rowOffsetTop = $(rowClass).offset().top - 200;
			//execute scroll tween to specified y coordinate
			TweenLite.to(window, 2, {scrollTo:{y:rowOffsetTop}, ease:Expo.easeOut, delay:1});
		}
		//make sure the menu items all link to home page sections appropriately (href value is in the #anchor format)
		$("#main-nav li a").each(function() {
			//get the text from the menu link, remove all white space, and change it to lowercase. Add a "#" to the front to create the appropriate href value
			newHref = "#" + $(this).text().replace(/\s+/g, "").toLowerCase();
			//set href value of the menu link to the above anchor
			$(this).attr("href", newHref);
		});
		//replace default anchor-jump behavior with scroll animation when a menu item is clicked
		$("#main-nav li a").click(function(e) {
			//stop anchor-jump
			e.preventDefault();
			//get href that was set above
			anchor = $(this).attr('href');
			//get the corresponding row class
			rowClass = "." + anchor.slice(1);
			//get the y value of the row (minus compensation for the menu)
			rowOffsetTop = $(rowClass).offset().top - 200;
			//execute scroll animation
			TweenLite.to(window, 2, {scrollTo:{y:rowOffsetTop}, ease:Expo.easeOut});
		});
	} else {
	//if on a page other than the home page, make the menu links point to the home page and correct home page section
		$("#main-nav li a").each(function() {
			//get link text, make it all lowercase, and remove the spaces
			newID = $(this).text().replace(/\s+/g, "").toLowerCase();
			//set href of every nav link to the homepage url with anchor on the end.
		  	$(this).attr("href", "http://kitchentabledigest.com/nkc2#" + newID);
		  	//This ensures that them menu links will always send the user to the right home page section instead of tacking the anchor to the end of the current page url
		});
		//scroll to the top of the content, skipping the header
		contentTop = $('div#content').offset().top,
		menuOffset = contentTop - 65;
		if(!$('body').hasClass('home')) {
			$(function() {
				TweenLite.to(window, 1.5, {scrollTo:{y:menuOffset}, ease:Expo.easeOut, delay:.5});
			});
		}
	}
	
}
scrollAnimate();

//Center tagline vertically compared to the height of the logo
function vCenterTagline() {
	//get the height of the logo
	var $headerLogoHeight = $("#site-logo").height(),
	  //get the tagline and its height
	  $tagline = $("#site-description"),
	  $taglineHeight = $tagline.height();
	  //set the bottom margin of the tagline to be half the height of the logo minus half the height of the tagline
	$tagline.css({
		marginBottom: function() {
			return (($headerLogoHeight/2)-($taglineHeight/2)) + "px";
		}
	});
}
vCenterTagline();





















