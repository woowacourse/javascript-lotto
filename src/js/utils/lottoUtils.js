import getRandomInt from './utils.js';

export function getLottoNumber() {
  return getRandomInt(1, 45);
}

export function getLottoNumberList() {
  return Array(6)
    .fill()
    .map(() => getLottoNumber());
}
