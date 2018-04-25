var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var counter = 0;
var letters = [];
var secretWord = 'helloworld';
var maxGuesses = 10;
var currentDraw = drawNormal;
var spacing = 60;


var images = [];
for (var i = 0; i <= maxGuesses; i++) {
    var img = new Image();
    img.src = 'img/hang' + i + '.gif';
    images.push(img);
}

window.addEventListener('resize', fit);
window.onload = fit();

function fit() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 2;
    currentDraw()
}

function guess() {
    var field = document.getElementById('letter');
    var letter = (field.value).toLowerCase().charAt(0);
    field.value = '';

    //Make sure the letter hasn't already been guessed
    if (!letters.includes(letter)) {
        checkOverLimit(letter);
        letters.push(letter);
        checkWin();
        currentDraw();
    }
}

function checkOverLimit(letter) {
    if (!secretWord.includes(letter)) {
        counter++;
        if (counter >= maxGuesses) {
            currentDraw = drawLose;
            document.getElementById('interact').style.display = 'none';
        }
    }
}

function checkWin() {
    var winning = true;
    for (var n = 0; n < secretWord.length; n++)
        if(!letters.includes(secretWord.charAt(n)))
            winning = false;
    if(winning){
        document.getElementById('interact').style.display = 'none';
        currentDraw = drawWin;
    }
}

//The normal state of drawing
function drawNormal() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[counter], 10, 10);
    drawSecretWord();
    drawIncorrectLetters();
}

//What to drawNormal when the player loses
function drawLose() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[counter], 10, 10);
    context.fillText('You Lose', 50, 300);
    drawSecretWord();
}

//What to drawNormal when the player Wins
function drawWin() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[counter], 10, 10);
    context.fillText('You Win', 50, 300);
    drawSecretWord();
}

//Draw Parts of Secret Words
function drawSecretWord() {
    context.font = "60px Georgia";
    for (var n = 0; n < secretWord.length; n++)
        context.fillText( letters.includes(secretWord.charAt(n))? secretWord.charAt(n): '_', n * spacing, 200);
}

//Draw Incorrect Letters
function drawIncorrectLetters() {
    context.font = "60px Georgia";
    var offset = 0;
    for (var i = 0; i < letters.length; i++) {
        if (letters[i] != undefined && !secretWord.includes(letters[i])) {
            context.fillText(letters[i], offset, 300);
            offset+=spacing;
        }
    }
}