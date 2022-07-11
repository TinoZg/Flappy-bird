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
const upForce = -20;
let obstacles = [];
let bird;
let gameOver = false;
let score = 0;
let wingSound;
let backgroundImage;
let pipeImage;
let animation = [];

p5.disableFriendlyErrors = true;

function preload() {
  wingSound = loadSound('./music/sfx_wing.mp3');
  backgroundImage = loadImage('./images/background.png');
  pipeImage = loadImage('./images/pipe.png');
  animation.push(loadImage('./images/bird-1.png'));
  animation.push(loadImage('./images/bird-2.png'));
}

function setup() {
  pixelDensity(1);
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
        height
      )
    ) {
      gameOver = true;
    }
  }

  text(`score: ${score}`, 10, 60);

  if (gameOver) {
    noLoop();

    // Prepare data to send to server
    const data = {
      username: localStorage.getItem('username'),
      score: score,
    };

    // Set options for fetch()
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    // Send data with fetch
    fetch('/score', options);
    location.href = '../leader-board/index.html';
  }
}

function mousePressed() {
  wingSound.play();
  bird.speed += upForce;
  return false;
}
