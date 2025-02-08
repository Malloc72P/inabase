import { getRandomInt } from '@demo/demo-util';
import { BallModelOptions } from '@model/ball';

export function createBallModels() {
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

  return options;
}
