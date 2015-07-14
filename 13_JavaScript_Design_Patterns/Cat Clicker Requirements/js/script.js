var catClickCount = 0;
var catClickCountElem;
var catClickEventHander = function() {
	if(catClickCountElem === undefined) {
		catClickCountElem = document.getElementById('count-item');
	}
	catClickCount++;
	catClickCountElem.textContent = catClickCount;
};

var catImage = document.getElementById('cat1-image');
catImage.addEventListener("click", catClickEventHander, false);