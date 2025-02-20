import Lotto from "./Lotto.js";
class LottoPack {
  #lottos;
  #checkCountResult = { 6: 0, "5+1": 0, 5: 0, 4: 0, 3: 0 };
  constructor(lottos) {
    this.#lottos = this.#generateLottos(lottos);
  }

  #generateLottos(lottos) {
    return lottos.map((lottoNumbers) => {
      return new Lotto(lottoNumbers);
    });
  }

  playCompare(answerLotto) {
    this.#lottos.forEach((lotto) => {
      const { winningCount, bonusCount } = lotto.compareWinningNumbers(answerLotto);
      this.#saveCheckCount(winningCount, bonusCount);
    });
  }

  #saveCheckCount(winningCount, bonusCount) {
    if (winningCount === 5 && bonusCount === 1) {
      this.#checkCountResult["5+1"]++;
    } else if (winningCount >= 3) {
      this.#checkCountResult[winningCount]++;
    }
  }

  get lottos() {
    return this.#lottos;
  }

  get checkCountResult() {
    return this.#checkCountResult;
  }
}

export default LottoPack;
