/* eslint-disable lines-between-class-members */
import { StaticValue, MatchCount } from '../constants/Constants.js';
import Lotto from './Lotto.js';
import LottoCalculator from './LottoCalculator.js';
import generateRandomNumbersInRange from '../utils/RandomNumberGenerator.js';

class LottoGame {
  #userLottoList;
  #gameLottos;

  generateUserLottos(purchaseCount) {
    this.#userLottoList = Array.from({ length: purchaseCount }).map(() => {
      const RANDOM_NUMBER = generateRandomNumbersInRange(
        StaticValue.LOTTO_LOWER_INCLUSIVE,
        StaticValue.LOTTO_UPPER_INCLUSIVE,
        StaticValue.LOTTO_LENGTH,
      );

      return new Lotto(RANDOM_NUMBER);
    });
  }

  getUserLottoList() {
    return this.#userLottoList.map((userLotto) => userLotto.getNumbers());
  }

  setGameLottos(winningNumbers, bonusNumber) {
    this.#gameLottos = { winningNumbers: [...winningNumbers], bonusNumber };
  }

  getResult() {
    const MATCH_STATES = this.#userLottoList.map(
      (userLotto) => MatchCount[userLotto.getMatchState({ ...this.#gameLottos })],
    );

    const calculator = new LottoCalculator(MATCH_STATES);

    const RANKS = calculator.calculateRank();
    const PROFIT_RATE = calculator.calculateProfitRate(RANKS);

    return { RANKS, PROFIT_RATE };
  }
}

export default LottoGame;
