'use strict';

console.log('hey');

// global variables
var leftImgTag = document.getElementById('leftProductImage');
var middleImgTag = document.getElementById('middleProductImage');
var rightImgTag = document.getElementById('rightProductImage');

var productsContainer = document.getElementById('allProducts');
var resultsContainer = document.getElementById('results');

var clickCount = 0;
var maxClicks = 25;


var Product = function(name, imgSrc = 'default.jpg', timesClicked, timesShown){
  //TODO - refactor to build own IDs
  this.name = name;
  this.url = imgSrc;
  // ternary operator - shorthand if/else statement
  this.timesClicked = timesClicked ? timesClicked : 0;
  this.timesShown = timesShown || 0;
  Product.allItems.push(this);
};

Product.allItems = [];
Product.previousImages = [];

//build our Product again
var buildProducts = function () {
  new Product('bag', './assets/bag.jpg');
  new Product('banana', './assets/banana.jpg');
  new Product('bathroom', './assets/bathroom.jpg');
  new Product('boots', './assets/boots.jpg');
  new Product('breakfast', './assets/breakfast.jpg');
  new Product('bubblegum', './assets/bubblegum.jpg');
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

var pickUniqueNonRepeating = function(currentPicks) {
  var index, product;
  do {
    index = getRandomIntInclusive(0, Product.allItems.length - 1);
    product = Product.allItems[index];

  } while (Product.previousImages.includes(product) || currentPicks.includes(product));

  return product;
};

var renderThreeNewProducts = function(){
  var currentPicks = [];
  //TODO: this should be a function pick VARIABLE X AMPOUNT unique images
  var leftProduct = pickUniqueNonRepeating(currentPicks);
  currentPicks.push(leftProduct);
  var rightProduct = pickUniqueNonRepeating(currentPicks);
  currentPicks.push(rightProduct);
  var middleProduct = pickUniqueNonRepeating(currentPicks);
  currentPicks.push(middleProduct);

  leftImgTag.src = leftProduct.url;
  rightImgTag.src = rightProduct.url;
  middleImgTag.src = middleProduct.url;

  Product.previousImages = currentPicks;
};

var handleClickOnImage = function(event){
  clickCount++;
  console.log(event.target.id);
  if(event.target.id === 'leftProductImage'){
    Product.previousImages[0].timesClicked++;
  }
  if (event.target.id === 'middleProductImage') {
    Product.previousImages[1].timesClicked++;
  }
  if (event.target.id === 'rightProductImage') {
    Product.previousImages[2].timesClicked++;
  }
  for(var i = 0; i < Product.previousImages.length; i++){
    Product.previousImages[i].timesShown++;
  }

  if(clickCount < maxClicks){
    renderThreeNewProducts();
  } else {
    productsContainer.removeEventListener('click', handleClickOnImage);

    for(i = 0; i < Product.allItems.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = Product.allItems[i].name + ' ' + Math.floor((Product.allItems[i].timesClicked / Product.allItems[i].timesShown) *100);
      resultsContainer.appendChild(liEl);
    }
  }
};


var initPage = function() {
  buildProducts();
  renderThreeNewProducts();
  productsContainer.addEventListener('click', handleClickOnImage);
};

initPage();


