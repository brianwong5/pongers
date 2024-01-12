let stage = document.getElementById("gameCanvas");
stage.width = 1200;
stage.height = 700;
let ctx = stage.getContext("2d");
ctx.font = "18px Courier";

let p1 = new Paddle({ uKey: 38, dKey: 40 });
let p2 = new Paddle({ uKey: 9001, dKey: 9002 }, true);
let ball = new Ball();
let ai = new AI(p2, ball);
let ai2 = new AI(p1, ball);
let pScore = 0, aiScore = 0;
let gameloop = setInterval(update, 16);

//key handlers
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(event) {
  event.preventDefault();
  p1.handleInput(event.keyCode, true);
}

function keyUpHandler(event) {
  event.preventDefault();
  p1.handleInput(event.keyCode, false);
}

function update() {
  //draw background first
  ctx.beginPath();
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, stage.width, stage.height);
  //then the objects
  ctx.fillStyle = "#FFF";
  ai.think();
  // ai2.think(); // comment to disable ai and enable player
  ball.update();
  p1.update();
  p2.update();

  ball.draw();
  p1.draw();
  p2.draw();
  ctx.fillText("Player Score: " + pScore, 70, 25);
  ctx.fillText("CPU Score: " + aiScore, stage.width - 200, 25)
}
