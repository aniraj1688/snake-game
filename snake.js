const cvs=document.getElementById('canvas');
const ctx=cvs.getContext('2d');
ctx.fillStyle="red";
ctx.fillRect(100,100,40,40);
let foodimg=new Image();
foodimg.src="frog.png";
ctx.drawImage(foodimg,0,0,50,50);

