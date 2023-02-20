import Lotto from './lotto/Lotto.js';
import generateRandomNumbersIn from '../util/RandomGenerator.js';

import Statistics from './Statistics.js';
import WinningLotto from './lotto/WinningLotto.js';
import {
  PRICE_DEFAULT,
  MAX_NUMBER_DEFAULT,
  MIN_NUMBER_DEFAULT,
  COUNT_DEFAULT,
} from '../util/constants/constants.js';

class LottoGame {
  SETTINGS;

  #RANDOM_GENERATOR;

  #lottos;

  #statistics;

  constructor({
    minNumber = MIN_NUMBER_DEFAULT,
    maxNumber = MAX_NUMBER_DEFAULT,
    count = COUNT_DEFAULT,
    price = PRICE_DEFAULT,
  } = {}) {
    this.SETTINGS = Object.freeze({
      minNumber,
      maxNumber,
      count,
      price,
    });
    this.#RANDOM_GENERATOR = generateRandomNumbersIn(minNumber, maxNumber)(count);
  }

  setLottos(money) {
    if (money < this.SETTINGS.price) throw new Error('[ERROR]12');

    if (money > Number.MAX_SAFE_INTEGER) throw new Error('[ERROR]10');

    const count = money / this.SETTINGS.price;

    this.#lottos = Array.from(
      { length: count },
      () => new Lotto(this.#RANDOM_GENERATOR(), this.SETTINGS)
    );

    return this;
  }

  setWinningLotto(winningNumbers, bonusNumber) {
    const winningLotto = new WinningLotto(new Lotto(winningNumbers, this.SETTINGS), bonusNumber);

    this.#statistics = new Statistics(winningLotto);

    return this;
  }

  getGameResult() {
    return this.#statistics
      .setCountByWinningPlace(this.getLottos())
      .setLottoYield(this.SETTINGS.price, this.#lottos.length)
      .getStatisticsResult();
  }

  getLottos() {
    return this.#lottos.map((lotto) => lotto.getNumbers());
  }
}

export default LottoGame;
