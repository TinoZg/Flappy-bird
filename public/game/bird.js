class Bird {
  constructor(animation) {
    this.y = 250;
    this.width = 150;
    this.height = 150;
    this.x = this.width;
    this.speed = 0;
    this.gravity = 0.5;
    this.animation = animation;
  }

  animate() {
    // rendering
    image(animation[floor((frameCount * 0.1) % animation.length)], this.x, this.y, this.width, this.height);

    // movement
    this.speed += this.gravity;
    this.speed = constrain(this.speed, -25, 25);
    this.y += this.speed;
  }

  check() {
    if (this.y + this.width > height) {
      this.y = height - this.width;
      this.speed = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.speed = 0;
    }
  }
}
