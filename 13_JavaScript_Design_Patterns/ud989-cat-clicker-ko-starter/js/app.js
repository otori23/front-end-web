// can load this data from a remote source
var initialCats = [
	{
		clickCount: 0,
		name: 'Tabby',
		imgSrc: 'img/434164568_fea0ad4013_z.jpg',
		imgAttribution: 'https://www.flickr.com/photos/bigtallguy/434164568',
		nicknames: ['Tabtab', 'T-Bone', 'Mr. T', 'Thabitha Tab Tabby Catty Cat']
	},
	{
		clickCount: 0,
		name: 'Tiger',
		imgSrc: 'img/4154543904_6e2428c421_z.jpg',
		imgAttribution: 'https://www.flickr.com/photos/xshamx/4154543904',
		nicknames: ['Tigger']
	},
	{
		clickCount: 0,
		name: 'Scaredy',
		imgSrc: 'img/22252709_010df3379e_z.jpg',
		imgAttribution: 'https://www.flickr.com/photos/kpjas/22252709',
		nicknames: ['Casper']
	},
	{
		clickCount: 0,
		name: 'Shadow',
		imgSrc: 'img/1413379559_412a540d29_z.jpg',
		imgAttribution: 'https://www.flickr.com/photos/malfet/1413379559',
		nicknames: ['Shooby']
	},
	{
		clickCount: 0,
		name: 'Sleepy',
		imgSrc: 'img/9648464288_2516b35537_z.jpg',
		imgAttribution: 'https://www.flickr.com/photos/onesharp/9648464288',
		nicknames: ['Zzzzz']
	}
];

var Cat = function(data) {
	this.clickCount = ko.observable(data.clickCount);
	this.name = ko.observable(data.name);
	this.imgSrc = ko.observable(data.imgSrc);
	this.imgAttribution = ko.observable(data.imgAttribution);
	this.nicknames = ko.observableArray(data.nicknames);

	this.level = ko.computed(function() {
		var result = 'undefined level';
		if (this.clickCount() < 10) {
			result = 'Newborn';
		} else if(this.clickCount() < 50) {
			result = 'Infant';
		} else if(this.clickCount() < 100) {
			result = 'Child';
		} else if(this.clickCount() < 200) {
			result = 'Teen';
		} else if(this.clickCount() < 500) {
			result = 'Adult';
		} else {
			result = 'Ninja';
		}
		return result;
	}, this);
};

var ViewModel = function() {
	// cache 'this' (pointer to ViewModel) 
	// to gaurd against later changes in context
	// self will always map to the ViewModel
	var self = this;

	this.catList = ko.observableArray([]);

	initialCats.forEach(function(catItem) {
		self.catList.push( new Cat(catItem) );
	});

	this.currentCat = ko.observable( this.catList()[0] );

	this.incrementCounter = function() {
		var cat = self.currentCat();
		cat.clickCount(cat.clickCount() + 1);
	};

	this.changeCurrentCat = function(cat, mouseEvent) {
		// 'this' is also bound to the cat that was clicked
		// i.e. cat === 'this' 
		self.currentCat(cat);
	};
};

ko.applyBindings(new ViewModel());