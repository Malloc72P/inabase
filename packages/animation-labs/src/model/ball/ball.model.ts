export interface BallModelOptions {
  x: number;
  y: number;
  dx: number;
  dy: number;
  width: number;
  height: number;
  containerX: number;
  containerY: number;
  speed?: number;
}

export class BallModel implements BallModelOptions {
  public x: number;
  public y: number;
  public dx: number;
  public dy: number;
  public width: number;
  public height: number;
  public containerX: number;
  public containerY: number;
  public speed: number;

  constructor(options: BallModelOptions) {
    this.x = options.x;
    this.y = options.y;
    this.dx = options.dx;
    this.dy = options.dy;
    this.width = options.width;
    this.height = options.height;
    this.containerX = options.containerX;
    this.containerY = options.containerY;
    this.speed = options.speed ?? 1;
  }

  move() {
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;

    if (this.x < 0) {
      this.x = 0;
      this.dx = 1 * this.speed;
    } else if (this.x + this.width > this.containerX) {
      this.x = this.containerX - this.width;
      this.dx = -1 * this.speed;
    }

    if (this.y < 0) {
      this.y = 0;
      this.dy = 1 * this.speed;
    } else if (this.y + this.height > this.containerY) {
      this.y = this.containerY - this.height;
      this.dy = -1 * this.speed;
    }
  }
}
