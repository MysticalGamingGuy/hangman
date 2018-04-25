
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var counter = 0;
var letters = [];
var secretWord = 'bob';

var images = [];
for(var i = 0; i < 11; i++){
    var img = new Image();
    img.src = 'img/hang'+i+'.gif';
    images.push(img);
}

window.addEventListener('resize', fit);
window.onload = fit();

function fit(){
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight/2;
    draw()
}

function guess(){
    var field = document.getElementById('letter');
    var letter = field.value;
    field.value = '';
    letters.push(letter);
    draw();
}

function draw(){
    ctx.font="60px Georgia";
    ctx.drawImage(images[counter],10,10);

    for(var n = 0; n < secretWord.length; n++)
            ctx.fillText('_',n*50,200);

    for(var i = 0; i < 11; i++)
        if(letters[i] != undefined)
            ctx.fillText(letters[i],i*50,300);
}
