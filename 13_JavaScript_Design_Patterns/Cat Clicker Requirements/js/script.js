"use strict";

/* 
 * Write Cat Clicker: Like a novice
 * -----------------------------------
 * - Break separation of concern discipline 
 * - store model data (i.e. the selected cat and its details) in view (i.e. in the DOM element attributes)
 * - BAD, BAD, BAD
 */

/*
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
*/



/* 
 * Write Cat Clicker Premium: Like a professional 
 * -----------------------------------------------
 * - Adhere to separation of concerns discipline
 * - Use MVO architecture, where flow control goes
 * - view -> octopus -> model
 * - view <- cotopus <- model
 */

function main() {
	var model = {
		cats: [],

		currentCatId: 0,

		// posssibly load data from external source
		// in this case hard code data into application source
		init: function() {
			this.cats.push({name: 'Cat-1', clickCount: 0});
			this.cats.push({name: 'Cat-2', clickCount: 0});
			this.cats.push({name: 'Cat-3', clickCount: 0});
			this.cats.push({name: 'Cat-4', clickCount: 0});
			this.cats.push({name: 'Cat-5', clickCount: 0});
			this.cats.push({name: 'Cat-6', clickCount: 0});
		},

		getNumCats: function() {
			return this.cats.length;
		},

		getCatNameById: function(id) {
			return this.cats[id].name;
		},

		getCurrentCatId: function() {
			return this.currentCatId;
		},

		setCurrentCatId: function(id) {
			if(this.currentCatId !== id) {
				this.currentCatId = id;
				octopus.currentCatIdChanged();
			}
		},
		
		getCurrentCatName: function() {
			return this.cats[this.currentCatId].name;
		},

		getCurrentCatClicks: function() {
			return this.cats[this.currentCatId].clickCount;
		},

		incrementCurrentCatClicks: function() {
			this.cats[this.currentCatId].clickCount++;
			octopus.currentCatClickCountChanged();
		}
	}

	// initialize model and view
	// store event handlers for model and view
	// remember always one way communication
	// view -> octopus -> model
	// view <- octopus <- model
	var octopus = {
		// initialize model(s) and view(s)
		init: function() {
			model.init();
			catListView.init();
			catDetailView.init();
		}, 
		
		catLinkSelectedHandler: function(e) {
			var id = catListView.getClickedCatLinkId(e.target);
			model.setCurrentCatId(id);
		},

		catDetailClickedHandler: function(e) {
			model.incrementCurrentCatClicks();
		},

		currentCatClickCountChanged: function() {
			catDetailView.render();
		},

		currentCatIdChanged: function() {
			catDetailView.render();
		},

		getNumCats: function() {
			return model.getNumCats();
		},

		getCatNameById: function(id) {
			return model.getCatNameById(id);
		},

		getCurrentCatName: function() {
			return model.getCurrentCatName();
		},

		getCurrentCatClicks: function() {
			return model.getCurrentCatClicks();
		},

		getCurrentCatId: function() {
			return model.getCurrentCatId();
		}
	};

	var catListView = {
		catList: document.createElement('ul'),

		catLinks: [],

		init: function() {
			// Create DOM nodes and register event handlers
			var numCats = octopus.getNumCats();
			var catLink, catItem;
			for(var i =0; i < numCats; i++) {
				catLink = document.createElement('a');
				catLink.href = '#';
				catLink.text =  octopus.getCatNameById(i);
				catLink.addEventListener("click", function(e) {
					octopus.catLinkSelectedHandler(e);
				});
				catItem = document.createElement('li');
				catItem.appendChild(catLink);
				this.catList.appendChild(catItem);
				this.catLinks.push(catLink);
			}

			// Render
			this.render();
			
		},

		render: function() {
			var catListSection = document.getElementById('cat-list');
			if(catListSection.childElementCount === 0) {
				catListSection.appendChild(this.catList);
			}
		},

		getClickedCatLinkId: function(link) {
			return this.catLinks.indexOf(link);
		}
	};

	var catDetailView = {
		
		init: function() {
			// Register event handler
			document.getElementById('cat-image').onclick = function(e) {
				octopus.catDetailClickedHandler(e);
			};

			// Render
			this.render();
		},

		render: function() {
			document.getElementById('cat-name').textContent = octopus.getCurrentCatName();
			document.getElementById('count-item').textContent = octopus.getCurrentCatClicks();
			document.getElementById('cat-image').src = 'images/cat' + (octopus.getCurrentCatId() + 1) + '.jpg';
		}
	};

	octopus.init();
}

window.document.body.onload = function() {
	main();
};