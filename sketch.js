// Valentino Novak

// Flappy bird game
// Press up_arrow to jump

// Collision detection library:
// https://github.com/bmoren/p5.collide2D

// Gameover image:
// "Game Over logo" by Midam, Éditions Dupuis licensed  Creative Commons Attribution 3.0: https://commons.wikimedia.org/wiki/File:Game_Over_logo.png

// Background image:
// "Flappy bird background" by pintu236 licensed CC-BY 4.0: https://opengameart.org/content/flappy-bird-background

// Pipe image:
// "Flappy Bunny" by mrnannings licensed CC-BY 3.0: https://opengameart.org/content/flappy-bunny

// Bird images:
// "Bevouliin free Bee flappy bird sprite sheets" by bevouliin.com licensed CC0: https://opengameart.org/content/bevouliin-free-bee-flappy-bird-sprite-sheets

let time = 120; //Obstacles are spawned every 2 seconds;
const upForce = -8;
let obstacles = [];
let bird;
let gameOver = false;
let score = 0;
let button;
let scoreDiv;
let wingSound;
let backgroundImage;
let gameOverImage;
let pipeImage;
let animation = [];

function preload() {
  wingSound = loadSound('./Music/sfx_wing.mp3');
  backgroundImage = loadImage('./Images/background.png');
  gameOverImage = loadImage('./Images/game-over.png');
  pipeImage = loadImage('./Images/pipe.png');
  animation.push(loadImage('./Images/bird-1.png'));
  animation.push(loadImage('./Images/bird-2.png'));
}

function setup() {
  createCanvas(800, 600);
  noLoop();
  bird = new Bird(animation);
  obstacles[0] = new Obstacle();
  button = createButton('Start/Restart');
  button.mousePressed(startRestart);
  button.class('btn btn-secondary');
  scoreDiv = createDiv('Score: ' + score);
  scoreDiv.style('font-size', '32px');
}

function draw() {
  image(backgroundImage, 0, 0, width, height);
  if (frameCount % floor(time) == 0) {
    obstacles.push(new Obstacle());
  }

  bird.animate();
  bird.check();
  for (const obstacle of obstacles) {
    obstacle.show();
    obstacle.move();

    if (
      collideRectRect(bird.x, bird.y, bird.width, bird.height, obstacle.x, 0, obstacle.width, obstacle.upperHeight) ||
      collideRectRect(
        bird.x,
        bird.y,
        bird.width,
        bird.height,
        obstacle.x,
        height - obstacle.lowerHeight,
        obstacle.width,
        obstacle.upperHeight
      )
    ) {
      gameOver = true;
    }
  }

  for (const obstacle of obstacles) {
    if (abs(obstacle.x, 0) < 2) {
      score++;
      scoreDiv.html('Score: ' + score);
    }
  }

  if (gameOver) {
    noLoop();
    clear();
    image(gameOverImage, 0, 0, width, height);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    wingSound.play();
    bird.speed += upForce;
  }
}

function touchEnded() {
    wingSound.play();
    bird.speed += upForce;
    return false;
}

function startRestart() {
  gameOver = false;
  score = 0;
  scoreDiv.html('Score: ' + score);
  frameCount = 0;
  bird = new Bird(animation);
  obstacles = [];
  obstacles[0] = new Obstacle();
  loop();
}
