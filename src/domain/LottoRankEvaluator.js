import rankCounter from "./rankCounter.js";

/* 발행된 로또를 매개변수로, 멤버로 우승 로또 받고 등수를 내주는 클래스 */
class LottoRankEvaluator {
  #winningLotto = {};

  constructor(winningLotto) {
    this.#winningLotto = { ...winningLotto };
  }

  #checkNormalNumbers = (lotto) => {
    return lotto.reduce(
      (count, number) => count + this.#isMatchedNumber(number),
      0
    );
  };

  #checkBonusNumber = (lotto, normalCount) => {
    return normalCount === 5 && lotto.includes(this.#winningLotto.bonusNumber)
      ? 1
      : 0;
  };

  /* 로또 게임 결과 산출과 관련된 함수들 */
  #countMatchingNumbers = (lotto) => {
    const lottoCounts = {
      normal: 0,
      bonus: false,
    };
    lottoCounts.normal = this.#checkNormalNumbers(lotto);
    lottoCounts.bonus = this.#checkBonusNumber(lotto, lottoCounts.normal);

    return lottoCounts;
  };

  #getMatchingResult = (issuedLottos) => {
    const matchingResult = issuedLottos.map(this.#countMatchingNumbers);
    return matchingResult;
  };

  #isMatchedNumber = (number) => {
    return this.#winningLotto.normalNumbers.includes(number) ? 1 : 0;
  };

  #inspectLottoGameResult(issuedLottos) {
    const matchingResult = this.#getMatchingResult(issuedLottos);
    const rankData = rankCounter.countRanks(matchingResult);

    return rankData;
  }

  getRankData(issuedLottos) {
    return this.#inspectLottoGameResult(issuedLottos);
  }
}

export default LottoRankEvaluator;
