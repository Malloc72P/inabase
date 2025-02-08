import { BallView, BallModel, BallModelOptions } from '../../main';

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

function getRandomInt(min: number, max: number) {
  // min, max 범위를 벗어나는 실수가 나오지 않도록 올림/내림을 고려합니다.
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);

  // Math.random() * (차이 + 1)을 통해 0 <= x < (차이+1)의 난수를 만들고,
  // floor를 씌우고 minCeil을 더해 실제 범위를 맞춥니다.
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}
