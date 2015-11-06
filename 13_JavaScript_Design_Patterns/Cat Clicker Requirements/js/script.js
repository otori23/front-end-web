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
			this.cats.push({name: 'Cat-1', clickCount: 0, imgURL: 'images/cat1.jpg'});
			this.cats.push({name: 'Cat-2', clickCount: 0, imgURL: 'images/cat2.jpg'});
			this.cats.push({name: 'Cat-3', clickCount: 0, imgURL: 'images/cat3.jpg'});
			this.cats.push({name: 'Cat-4', clickCount: 0, imgURL: 'images/cat4.jpg'});
			this.cats.push({name: 'Cat-5', clickCount: 0, imgURL: 'images/cat5.jpg'});
			this.cats.push({name: 'Cat-6', clickCount: 0, imgURL: 'images/cat6.jpg'});
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

		getCurrentCatImgURL: function() {
			return this.cats[this.currentCatId].imgURL;
		},

		incrementCurrentCatClicks: function() {
			this.cats[this.currentCatId].clickCount++;
			octopus.currentCatClickCountChanged();
		},

		editCurrentCatData: function(newData) {
			this.cats[this.currentCatId].name = newData.name;
			this.cats[this.currentCatId].clickCount = newData.clickCount;
			this.cats[this.currentCatId].imgURL = newData.imgURL;
			octopus.currentCatDataChanged();
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
			catAdminView.init();
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

		getCurrentCatImgURL: function() {
			return model.getCurrentCatImgURL();
		},

		getCurrentCatId: function() {
			return model.getCurrentCatId();
		},

		currentCatDataChangedHandler: function() {
			var newCatData = catAdminView.getNewCatData();
			model.editCurrentCatData(newCatData);
		},

		currentCatDataChanged: function() {
			catListView.init();
			catDetailView.render();
		}
	};

	var catListView = {
		init: function() {
			// Create DOM nodes and register event handlers
			
			this.catList = document.createElement('ul');
			this.catLinks = [];

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
			catListSection.innerHTML = '';
			catListSection.appendChild(this.catList);

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
			document.getElementById('cat-image').src = octopus.getCurrentCatImgURL();
		}
	};

	var catAdminView = {
		show: false,

		init: function() {
			// Register event handler
			document.getElementById('admin-btn').onclick = function() {
				catAdminView.show = true;
				catAdminView.render();
			};

			document.getElementById('save-btn').onclick = function() {
				octopus.currentCatDataChangedHandler();
				document.getElementById('name-text').value = '';
				document.getElementById('clicks-text').value = '';
				document.getElementById('img-url-text').value = '';
			};

			document.getElementById('cancel-btn').onclick = function() {
				var handleCancel = function(){
					this.show = false;
					this.render();
				};
				handleCancel.call(catAdminView);
			};

			// Render
			this.render();
		},

		render: function() {
			var elems = document.getElementsByClassName('admin-area');
			for(var i = 0; i < elems.length; i++) {
				elems[i].style.display = (this.show)? 'initial' : 'none';
			}
		},

		getNewCatData: function() {
			var newCatData = {};
			newCatData.name = document.getElementById('name-text').value || octopus.getCurrentCatName();
			newCatData.clickCount = document.getElementById('clicks-text').value || octopus.getCurrentCatClicks();
			newCatData.imgURL = document.getElementById('img-url-text').value || octopus.getCurrentCatImgURL();
			return newCatData;
		}
	};

	octopus.init();
}

window.document.body.onload = function() {
	main();
};