
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var imgs = [];
var counter = 0;
var letters = [];

for(var i = 0; i < 11; i++){
    var img = new Image();
    img.src = 'img/hang'+i+'.gif';
    imgs.push(img);
}

window.onload = function() {
    ctx.drawImage(imgs[counter],10,10);
};

function guess(){
    var letter = document.getElementById('letter').value;
    letters.push(letter);
    console.log(letters);
}
