import { BallModel, BallModelOptions } from '@model/ball';
import { CanvasBallView } from '@view/ball';
import { createBallModels } from '../utils/ball-demo-util';
import { CanvasRenderer } from '@view/index';

const canvas = document.getElementById('container') as HTMLCanvasElement;

if (!canvas) {
  throw new Error('no container');
}

const options: BallModelOptions[] = createBallModels(1, 300, 300);

const ballViews = options
  .map((option) => new BallModel(option))
  .map((model) => new CanvasBallView(model));

const renderer = new CanvasRenderer({
  canvas,
  width: 300,
  height: 300,
});

renderer.addItems(...ballViews);
renderer.start();
