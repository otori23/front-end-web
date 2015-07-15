"use strict";

// Cat List
var numCats = 5;

var ulist = document.createElement('ul');
var catItem, catLink;
for(var i = 1; i <= numCats; i++) {
  catLink = document.createElement('a');
  catLink.href = '#';
  catLink.text = 'Cat-' + i ;
  catLink.id = 'cat' + i;

  catLink.addEventListener("click", (function() {
	  var name = catLink.text;
	  var image = 'images/' + catLink.id + '.jpg';
	  var clicks = 0;
	  var imgClickEventHandler = function() {
		  document.getElementById('count-item').textContent = ++clicks;
	  };

	  return function() {
		  document.getElementById('cat-name').textContent = name;
		  document.getElementById('count-item').textContent = clicks;
		  var catImage = document.getElementById('cat-image')
		  catImage.src = image;
		  catImage.onclick = imgClickEventHandler;
	  };
  })());

  catItem = document.createElement('li');
  catItem.appendChild(catLink);
  ulist.appendChild(catItem);
}

var catList = document.getElementById('cat-list');
catList.appendChild(ulist);