import Lotto from "./Lotto.js";
import generateRandomNumbersInRange from "../utils/RandomNumberGenerator.js";
import LottoCalculator from "./LottoCalculator.js";
import { MatchCount } from "../constants/Constants.js";

class LottoGame {
  #userLottos;
  #gameLottos;

  generateUserLottos(purchaseCount) {
    this.#userLottos = Array.from({ length: purchaseCount }).map(() => {
      const RANDOM_NUMBER = generateRandomNumbersInRange(1, 45, 6);

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
      (userLotto) => MatchCount[userLotto.getMatchState()]
    );

    const calculator = new LottoCalculator(MATCH_STATES);

    const RANKS = calculator.calculateRank();
    const PROFIT_RATE = calculator.calculateProfitRate(RANKS);

    return { RANKS, PROFIT_RATE };
  }
}

export default LottoGame;
