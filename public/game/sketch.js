// Valentino Novak

// Flappy bird game
// Press up_arrow to jump

// Collision detection library:
// https://github.com/bmoren/p5.collide2D

// Background image:
// "Flappy bird background" by pintu236 licensed CC-BY 4.0: https://opengameart.org/content/flappy-bird-background

// Pipe image:
// "Flappy Bunny" by mrnannings licensed CC-BY 3.0: https://opengameart.org/content/flappy-bunny

// Bird images:
// "Bevouliin free Bee flappy bird sprite sheets" by bevouliin.com licensed CC0: https://opengameart.org/content/bevouliin-free-bee-flappy-bird-sprite-sheets

let time = 120; //Obstacles are spawned every 2 seconds;
const upForce = -22;
let obstacles = [];
let bird;
let gameOver = false;
let score = 0;
let wingSound;
let backgroundImage;
let pipeImage;
let animation = [];

function preload() {
  wingSound = loadSound('./music/sfx_wing.mp3');
  backgroundImage = loadImage('./images/background.png');
  pipeImage = loadImage('./images/pipe.png');
  animation.push(loadImage('./images/bird-1.png'));
  animation.push(loadImage('./images/bird-2.png'));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textStyle(BOLD);
  textSize(80);
  fill(0);
  bird = new Bird(animation);
  obstacles[0] = new Obstacle();
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
    if (abs(obstacle.x) < 4) {
      score++;
    }

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
        height //obstacle.upperHeight
      )
    ) {
      gameOver = true;
    }
  }

  text(`score: ${score}`, 10, 60);

  if (gameOver) {
    location.href = '../leader-board/index.html';
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    wingSound.play();
    bird.speed += upForce;
  }
}
