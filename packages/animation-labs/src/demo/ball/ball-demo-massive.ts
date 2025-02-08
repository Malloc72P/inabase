import { BallView, BallModel, BallModelOptions } from '../../main';
import { getRandomInt } from '../demo-util';

const container = document.getElementById('container');

if (!container) {
  throw new Error('no container');
}

const options: BallModelOptions[] = new Array(50).fill(0).map((v, i) => ({
  x: getRandomInt(0, 250),
  y: getRandomInt(0, 250),
  dx: getRandomInt(0, 1) === 0 ? -1 : 1,
  dy: getRandomInt(0, 1) === 0 ? -1 : 1,
  width: 32,
  height: 32,
  containerX: 300,
  containerY: 300,
}));

const ballView = options
  .map((option) => new BallModel(option))
  .map((model) => new BallView(container, model));

ballView.forEach((view) => view.start());
