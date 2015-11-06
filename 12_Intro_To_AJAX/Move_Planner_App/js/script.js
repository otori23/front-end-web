'use strict';

function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // YOUR CODE GOES HERE!

	// load street view background image
	var street = $('#street').val();
	var city = $('#city').val();
	var loc =  street + ', ' + city;
	$greeting.text('So, you want to live at ' + loc + '?');
	var imgSrc = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + loc;
	$body.append('<img class="bgimg" src="' + imgSrc + '">');

	// Get NY Times articles
	var nytAPIkey = 'c0007d89e8262ba2fbc79bb95337ab71:3:72491520';	
	var nytURI = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + loc + '&sort=newest&api-key=' + nytAPIkey;
	$.getJSON(nytURI, function(data) {
		$nytHeaderElem.text('New York Times Atricles About ' + loc);
		data.response.docs.forEach(function(doc) {
			var headline = $('<a></a>');
			headline.text(doc.headline.main);
			headline.attr('href', doc.web_url);

			var lead = $('<p></p>');
			lead.text(doc.snippet);

			var listItem = $('<li class="article"></li>');
			listItem.append(headline);
			listItem.append(lead);
			$nytElem.append(listItem);
		});
	})
	.error(function(e) {
		$nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
	});

	// Get Wikipeida links
	// No API Key, YAY!!!!!
	var wikiRequestTimeout = setTimeout(function() {
		$wikiElem.text("failed to get wikipedia resources");
	}, 8000);

	var wikiURI = 'https://en.wikipedi.org/w/api.php?action=opensearch&search='+city+'&format=json&callback=wikiCallback';
	var wikiAjaxSettings = {
		url: wikiURI,
		dataType: "jsonp",
		//jsonp: "callback",
		success: function (data, textStatus, jqXHR) {
			var articleList = data[1];
			articleList.forEach(function(item, index) {
				var wikiLink = $('<a></a>');
				wikiLink.text(item);
				wikiLink.attr('href', data[3][index]);

				var listItem = $('<li></li>');
				listItem.append(wikiLink);
				$wikiElem.append(listItem);

				clearTimeout(wikiRequestTimeout);
			});
		}
	};

	$.ajax(wikiAjaxSettings);
    return false;
};

$('#form-container').submit(loadData);
