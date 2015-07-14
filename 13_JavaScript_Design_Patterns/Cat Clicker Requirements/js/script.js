var catClickEventHander = function(e) {
	var catImg = document.getElementById(e.srcElement.id);
	var catClickCountElem = catImg.previousElementSibling;
	var catClickCount = parseInt(catClickCountElem.textContent);
	catClickCountElem.textContent = ++catClickCount;
};


var catName1 = "cat1";
var catName2 = "cat2";

document.getElementById('cat-name1').textContent = catName1;
document.getElementById('cat-name2').textContent = catName2;

var catImage = document.getElementById('cat1-image');
catImage.addEventListener("click", catClickEventHander, false);

catImage = document.getElementById('cat2-image');
catImage.addEventListener("click", catClickEventHander, false);