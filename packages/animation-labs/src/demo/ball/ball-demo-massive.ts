import { BallView, BallModel, BallModelOptions } from '../../main';
import { getRandomInt } from '../demo-util';

const container = document.getElementById('container');

if (!container) {
  throw new Error('no container');
}

async function createModelOptions() {
  const options: BallModelOptions[] = new Array(5000).fill(0).map((v, i) => ({
    x: getRandomInt(0, 250),
    y: getRandomInt(0, 250),
    dx: getRandomInt(0, 1) === 0 ? -1 : 1,
    dy: getRandomInt(0, 1) === 0 ? -1 : 1,
    width: 32,
    height: 32,
    containerX: 600,
    containerY: 600,
    speed: getRandomInt(3, 10),
  }));

  return options;
}

async function createView(container: HTMLElement, options: BallModelOptions[]) {
  return options
    .map((option) => new BallModel(option))
    .map((model) => new BallView(container, model));
}

async function draw(viewList: BallView[]) {
  viewList.forEach((view) => view.start());
}

(async function main() {
  const options = await createModelOptions();
  const views = await createView(container, options);
  draw(views);
})();
