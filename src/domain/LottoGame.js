import Lotto from './lotto/Lotto.js';
import generateRandomNumbersIn from '../util/RandomGenerator.js';
import {
  PRICE_DEFAULT,
  MAX_NUMBER_DEFAULT,
  MIN_NUMBER_DEFAULT,
  COUNT_DEFAULT,
} from './constant/constants.js';
import Statistics from './Statistics.js';
import WinningLotto from './lotto/WinningLotto.js';

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

  issueLottos(money) {
    const count = money / this.SETTINGS.price;
    this.#lottos = Array.from(
      { length: count },
      () => new Lotto(this.#RANDOM_GENERATOR(), this.SETTINGS)
    );

    return this;
  }

  setWinningLotto(winningNumbers, bonusNumber) {
    this.#statistics = new Statistics(
      new WinningLotto(new Lotto(winningNumbers, this.SETTINGS), bonusNumber)
    );
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

// TODO: 테스트로 옮기기
// const lottoGame = new LottoGame();
// const result = lottoGame
//   .issueLottos(20_000)
//   .setWinningLotto([11, 12, 13, 14, 5, 6], 7)
//   .getGameResult();

// result.first.getCount();
// console.log('>>> result:', result);
