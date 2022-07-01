class Bird {
  constructor(animation) {
    this.y = height * 0.5;
    this.width = 50;
    this.height = 50;
    this.x = this.width;
    this.speed = 0;
    this.gravity = 0.3;
    this.animation = animation;
  }

  animate() {
    // rendering
    image(animation[floor((frameCount * 0.1) % animation.length)], this.x, this.y, this.width, this.height);

    // movement
    this.speed += this.gravity;
    this.speed = constrain(this.speed, -10, 10);
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
