import { BallModel } from '@model/ball';
import { CanvasRenderer } from '@view/renderer/canvas-renderer';

export class CanvasBallView {
  constructor(public model: BallModel) {}

  render(renderer: CanvasRenderer) {
    this.model.move();

    this.drawCircle(renderer, this.model.x, this.model.y, this.model.radius, 'red');
  }

  private drawCircle(
    renderer: CanvasRenderer,
    x: number,
    y: number,
    radius: number,
    color: string
  ) {
    const ctx = renderer.ctx;

    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }
}
