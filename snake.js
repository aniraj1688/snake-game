let t=100,speedX=1;
let speedY=1;
const box=20;
const cvs=document.getElementById('canvas');
const ctx=cvs.getContext('2d');
let d="r";
let snake=[];
let score=0;
snake[0]={x:4*box,y:4*box};
snake[1]={x:3*box,y:4*box};
food={x:7*box,y:7*box};
flag=true;
maze=[];
function makeMaze()
{
	for(let i=3;i<16;i++)
	{
		let y=9;
		let newm={x:i,y:y};
		maze.push(newm);
	}
	for(let i=16;i<29;i++)
	{
		let y=18;
		let newm={x:i,y:y};
		maze.push(newm);
	}
}

function drawMaze()
{
	for(let i=0;i<maze.length;i++)
	{
		ctx.fillStyle="brown";
		ctx.fillRect(maze[i].x*box,maze[i].y*box,box,box);
	}
}

makeMaze();
drawMaze();
generateFood();
function direction(event)
{
	let key=event.keyCode;
	if(flag==true)
	{
		if(key==37 && d!="r")
		{
			d="l";
			speedX=-1;
			speedY=0;
		}
		if(key==38 && d!="d")
		{
			d="u";
			speedY=1;
			speedX=0;
		}
		if(key==39 && d!="l")
		{
			d="r";
			speedX=1;
			speedY=0;
		}
		if(key==40 && d!="u")
		{
			d="d";
			speedY=-1;
			speedX=0;
		}
		speedX*=20.00/t*1000;
		speedY*=20.00/t*1000;
		flag=false;
	}
}

function gameOver()
{
	clearInterval(game);
	window.alert("GAME OVER");
}

function generateFood()
{
	food.x=Math.floor(Math.random()*31)*box;
	food.y=Math.floor(Math.random()*27)*box;
	for(let i=0;i<snake.length;i++)
	{
		if(food.x==snake[i].x && food.y==snake[i].y)
			generateFood();
	}
	for(let i=0;i<maze.length;i++)
	{
		if(food.x==maze[i].x*box && food.y==maze[i].y*box)
			generateFood();
	}
}


function collision(){
	for(let i=0;i<maze.length;i++)
	{
		if(snake[0].x==maze[i].x*box && snake[0].y==maze[i].y*box)
			return true;
	}
	for(let i=1;i<snake.length;i++)
	{
		if(snake[0].x==snake[i].x && snake[0].y==snake[i].y)
			return true;
	}
	
	
	return false;
	
}

function draw()
{

	document.getElementById("score").innerHTML="<h2>SCORE : "+score+"</h2>";
	document.getElementById("x").innerHTML="<h4>SpeedX : "+speedX+"px/sec</h4>";
	document.getElementById("y").innerHTML="<h4>SpeedY : "+speedY+"px/sec</h4>";
	ctx.fillStyle="white";
	ctx.fillRect(0,0,620,540);	
	
	
	for(let i=0;i<snake.length;i++)
	{
		ctx.fillStyle="green";
		ctx.fillRect(snake[i].x,snake[i].y,box,box);
	}
	ctx.fillStyle="red";
	ctx.fillRect(food.x,food.y,box,box);
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
	document.addEventListener("keydown",direction);
	if(snakeX>600 || snakeX<0 || snakeY>520 || snakeY<0 || collision())
	{
		gameOver();
	}
	let newHead={x:snakeX,y:snakeY};
	if(snakeX!=food.x || snakeY!=food.y)
		snake.pop();
	snake.unshift(newHead);
	if(snakeX==food.x && snakeY==food.y)
	{
		generateFood();
		score++;
		clearInterval(game);
		//can change speed here
		game=setInterval(draw,t);

	}
	drawMaze();
	flag=true;
	
	
}


let game = setInterval(draw,t);






