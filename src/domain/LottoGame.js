import { StaticValue, MatchCount } from '../constants/Constants.js';
import Lotto from './Lotto.js';
import LottoCalculator from './LottoCalculator.js';
import generateRandomNumbersInRange from '../utils/RandomNumberGenerator.js';

class LottoGame {
  #userLottos;

  #gameLottos;

  generateUserLottos(purchaseCount) {
    this.#userLottos = Array.from({ length: purchaseCount }).map(() => {
      const RANDOM_NUMBER = generateRandomNumbersInRange(
        StaticValue.LOTTO_LOWER_INCLUSIVE,
        StaticValue.LOTTO_UPPER_INCLUSIVE,
        StaticValue.LOTTO_LENGTH,
      );

      return new Lotto(RANDOM_NUMBER);
    });
  }

  getUserLottos() {
    return this.#userLottos.map((userLotto) => userLotto.getNumbers());
  }

  setGameLottos(winningNumbers, bonusNumber) {
    this.#gameLottos = { winningNumbers: [...winningNumbers], bonusNumber };
  }

  getResult() {
    const MATCH_STATES = this.#userLottos.map(
      (userLotto) => MatchCount[userLotto.getMatchState({ ...this.#gameLottos })],
    );

    const calculator = new LottoCalculator(MATCH_STATES);

    const RANKS = calculator.calculateRank();
    const PROFIT_RATE = calculator.calculateProfitRate();

    return { RANKS, PROFIT_RATE };
  }
}

export default LottoGame;
