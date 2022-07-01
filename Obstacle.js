class Obstacle {
  constructor() {
    this.gap = floor(random(120, 180));
    this.upperHeight = floor(random(50, 200));
    this.width = 50;
    this.lowerHeight = height - this.upperHeight - this.gap;
    this.x = width;
  }

  show() {
    image(pipeImage, this.x, 0, this.width, this.upperHeight);
    image(pipeImage, this.x, height - this.lowerHeight, this.width, this.lowerHeight);
  }

  move() {
    this.x = this.x - 3;
  }
}
