import Lotto from "./Lotto.js";
import { MATCH_COUNT } from "../constants/constant.js";

class LottoPack {
  #lottos;

  constructor(lottos) {
    this.#lottos = this.#generateLottos(lottos);
  }

  compareAndReturnResult(answerLotto) {
    const checkCountResult = {
      [MATCH_COUNT.SIX]: 0,
      [MATCH_COUNT.FIVE_BONUS]: 0,
      [MATCH_COUNT.FIVE]: 0,
      [MATCH_COUNT.FOUR]: 0,
      [MATCH_COUNT.THREE]: 0,
    };

    this.#lottos.forEach((lotto) => {
      const { winningCount, bonusCount } = lotto.compareWinningNumbers(answerLotto);
      this.#saveCheckCount({ winningCount, bonusCount }, checkCountResult);
    });

    return checkCountResult;
  }

  #generateLottos(lottos) {
    return lottos.map((lottoNumbers) => {
      return new Lotto(lottoNumbers);
    });
  }

  #saveCheckCount({ winningCount, bonusCount }, checkCountResult) {
    if (winningCount >= 3) {
      const matchKey = this.#mappingWinningCount(winningCount, bonusCount);
      checkCountResult[matchKey]++;
    }
  }

  #mappingWinningCount(winningCount, bonusCount) {
    if (winningCount === 5 && bonusCount === 1) {
      return MATCH_COUNT.FIVE_BONUS;
    }

    const matchMap = {
      6: MATCH_COUNT.SIX,
      5: MATCH_COUNT.FIVE,
      4: MATCH_COUNT.FOUR,
      3: MATCH_COUNT.THREE,
    };

    return matchMap[winningCount];
  }

  get lottos() {
    return [...this.#lottos];
  }
  get count() {
    return this.#lottos.length;
  }
}

export default LottoPack;
