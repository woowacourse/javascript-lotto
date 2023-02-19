import { MatchCount, RandomNumberStaticValue } from '../constants/Constants.js';
import Lotto from './Lotto.js';
import LottoCalculator from './LottoCalculator.js';
import generateRandomNumbers from '../utils/RandomNumberGenerator.js';

class LottoGame {
  #userLottos;

  #winningLotto;

  generateUserLottos(purchaseCount) {
    const { LOWER_INCLUSIVE, UPPER_INCLUSIVE, LENGTH } = RandomNumberStaticValue;
    this.#userLottos = Array.from({ length: purchaseCount }).map(() => {
      const RANDOM_NUMBERS = generateRandomNumbers(LOWER_INCLUSIVE, UPPER_INCLUSIVE, LENGTH);
      return new Lotto(RANDOM_NUMBERS);
    });

    return this.#getUserLottos();
  }

  #getUserLottos() {
    return this.#userLottos.map((userLotto) => userLotto.getStringifiedNumbers());
  }

  setGameLottos(winningNumbers, bonusNumber) {
    this.#winningLotto = { winningNumbers: [...winningNumbers], bonusNumber };
  }

  getResult() {
    const MATCH_STATES = this.#userLottos.map(
      (userLotto) => MatchCount[userLotto.getMatchState({ ...this.#winningLotto })],
    );

    const calculator = new LottoCalculator(MATCH_STATES);

    const RANKS = calculator.calculateRank();
    const PROFIT_RATE = calculator.calculateProfitRate();

    return { RANKS, PROFIT_RATE };
  }
}

export default LottoGame;
