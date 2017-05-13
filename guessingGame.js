var squares = document.querySelectorAll(".square");

var title = document.querySelector("#title");
var colorDisplay = document.querySelector("#colorDisplay");
var message = document.querySelector("#message");

var resetButton = document.querySelector("#resetButton");
var easyButton = document.querySelector("#easyButton");
var normalButton = document.querySelector("#normalButton");
var hardButton = document.querySelector("#hardButton");

var numberOfSquares, colors, pickedColor;

init();

function init() {
	addButtonsListeners();
	defineDifficulty("hard");	
	addSquaresListeners();
}

function addButtonsListeners() {
	resetButton.addEventListener("click", reset);

	easyButton.addEventListener("click", defineDifficulty.bind(this, "easy"));
	normalButton.addEventListener("click", defineDifficulty.bind(this, "normal"));
	hardButton.addEventListener("click", defineDifficulty.bind(this, "hard"));
}

function reset() {
	title.style.backgroundColor = "steelblue";
	resetButton.textContent = "New Colors";
	message.textContent = "";

	colors = generateRandomColors(numberOfSquares);
	pickedColor = colors[Math.floor(Math.random() * colors.length)];

	colorDisplay.textContent = pickedColor;

	for(var c = 0; c < colors.length; c++) {
		squares[c].style.backgroundColor = colors[c];
	}
}

function generateRandomColors(numberOfColors) {
	var randomColors = [];
	
	for(var c = 0; c < numberOfColors; c++) {
		randomColors.push("rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")");
	}
	
	return randomColors;
}

function defineDifficulty(difficulty) {
	easyButton.classList.remove("selected");
	normalButton.classList.remove("selected");
	hardButton.classList.remove("selected");

	switch(difficulty) {
		case "easy":
			easyButton.classList.add("selected");
			numberOfSquares = 3;
			break;
		case "normal":
			normalButton.classList.add("selected");
			numberOfSquares = 6;
			break;
		case "hard":
		default:
			hardButton.classList.add("selected");
			numberOfSquares = 9;
	}
	
	for(var s = 0; s < squares.length; s++) {
		squares[s].style.display = (s < numberOfSquares) ? "block" : "none";
	}
	
	reset();
}

function addSquaresListeners() {
	for(var s = 0; s < squares.length; s++) {
		squares[s].addEventListener("click", function(){
			if(this.style.backgroundColor == pickedColor) {
				changeColors(pickedColor);
				resetButton.textContent = "Play again?";
				message.textContent = "Correct!";
			} else {
				this.style.backgroundColor = "#232323";
				message.textContent = "Try again";
			}
		});
	}
}

function changeColors(color){
	for(var s = 0; s < squares.length; s++) {
		squares[s].style.backgroundColor = color;
	}

	title.style.backgroundColor = color;
}