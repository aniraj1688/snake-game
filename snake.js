const cvs=document.getElementById('canvas');
const ctx=cvs.getContext('2d');
let gridimg=new Image();
gridimg.src="grid.png";
ctx.drawImage(gridimg,0,0);
ctx.fillStyle="red";
ctx.fillRect(100,100,40,40);




