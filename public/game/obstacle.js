class Obstacle {
  constructor() {
    this.gap = floor(random(height * 0.15, height * 0.25));
    this.upperHeight = floor(random(0.1 * height, 0.5 * height));
    this.width = 150;
    this.lowerHeight = height - this.upperHeight - this.gap;
    this.x = width;
  }

  show() {
    image(pipeImage, this.x, 0, this.width, this.upperHeight);
    image(pipeImage, this.x, height - this.lowerHeight, this.width, this.lowerHeight);
  }

  move() {
    this.x = this.x - 7;
  }
}
