import { getRandomInt } from './utils/utils.js';

export default class LottoApp {
  static getNumberOfLotto(amount) {
    return parseInt(amount / 1000, 10);
  }

  static generateLottoNumber() {
    return getRandomInt(1, 45);
  }
}
