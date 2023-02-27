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
    if (Number.isNaN(money)) {
      throw new Error(`\n[ERROR] 구입 금액은 숫자로만 입력 가능합니다. \n`);
    }

    if (money < this.SETTINGS.price) {
      throw new Error(
        `\n[ERROR] 로또 가격은 ${this.SETTINGS.price}원 입니다. 최소 ${this.SETTINGS.price}워 이상 금액을 입력해주세요.\n`
      );
    }

    if (money > Number.MAX_SAFE_INTEGER) {
      throw new Error('\n[ERROR] 너무 큰 금액은 입력할 수 없습니다.\n');
    }

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
