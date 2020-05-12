const box=32;
const cvs=document.getElementById('canvas');
const ctx=cvs.getContext('2d');
let d="r";
let snake=[];
let score=0;
snake[0]={x:4*box,y:4*box};
snake[1]={x:3*box,y:4*box};
food={x:7*box,y:7*box};
generateFood();

document.addEventListener("keydown",direction);

function direction(event)
{
	let key=event.keyCode;
	if(key==37 && d!="r")
	{
		d="l";
	}
	if(key==38 && d!="d")
	{
		d="u";
	}
	if(key==39 && d!="l")
	{
		d="r";
	}
	if(key==40 && d!="u")
	{
		d="d";
	}
}

function generateFood()
{
	food.x=Math.floor(Math.random()*19)*box;
	food.y=Math.floor(Math.random()*17)*box;
}


function draw()
{
	document.getElementById("score").innerHTML="SCORE : "+score;
	ctx.fillStyle="white";
	ctx.fillRect(0,0,608,542);	
	ctx.fillStyle="red";
	ctx.fillRect(food.x,food.y,box,box);
	
	for(let i=0;i<snake.length;i++)
	{
		ctx.fillStyle="green";
		ctx.fillRect(snake[i].x,snake[i].y,box,box);
	}
	snakeX=snake[0].x;
	snakeY=snake[0].y;
	if(d=="r")
		snakeX+=box;
	else if(d=="l")
		snakeX-=box;
	else if(d=="u")
		snakeY-=box;
	else if(d=="d")
		snakeY+=box;
	
	if(snakeX>576 || snakeX<0 || snakeY>542 || snakeY<0)
		clearInterval(game);
		
	let newHead={x:snakeX,y:snakeY};
	if(snakeX!=food.x || snakeY!=food.y)
		snake.pop();
	else
	{
		generateFood();
		score++;
	}
	snake.unshift(newHead);

	
}

let game = setInterval(draw,130);






