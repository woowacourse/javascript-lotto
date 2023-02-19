import Core from "../constants/Core";
import Score from "../constants/Score.js";
import Lotto from "../constants/Lotto";
import Utils from "../util/Utils";

class LottoScore {
  #lottoRanking;

  constructor(lottos) {
    this.lottos = lottos;
    this.#lottoRanking = { ...Core.rankingBoard };
    this.totalBenefit = 0;
  }

  get lottoRanking() {
    return { ...this.#lottoRanking };
  }

  compareLottosScore() {
    this.lottos.forEach((lotto) => {
      this.determineAddScore(lotto);
    });
  }

  determineAddScore(lotto) {
    !this.checkIsFailScore(lotto) && lotto.score === 5
      ? this.determineBonusOrNot(lotto)
      : this.addScoreBoard(lotto.score);
  }

  determineBonusOrNot(lotto) {
    lotto.isContainBonusNumber
      ? this.addScoreBoard(Score.SECOND)
      : this.addScoreBoard(Score.THIRD);
  }

  checkIsFailScore(lotto) {
    return (
      lotto.score === Score.ZERO ||
      lotto.score === Score.ONE ||
      lotto.score === Score.TWO
    );
  }

  addScoreBoard(score) {
    switch (score) {
      case Score.FIFTH:
        this.#lottoRanking[Score.FIFTH] += 1;
        break;
      case Score.FOURTH:
        this.#lottoRanking[Score.FOURTH] += 1;
        break;
      case Score.THIRD:
        this.#lottoRanking[Score.THIRD] += 1;
        break;
      case Score.SECOND:
        this.#lottoRanking[Score.SECOND] += 1;
        break;
      case Score.FIRST:
        this.#lottoRanking[Score.FIRST] += 1;
    }
  }

  calculateTotalBenefit() {
    for (const score in this.#lottoRanking) {
      this.totalBenefit += this.#lottoRanking[score] * Core.benefitBoard[score];
    }
  }

  getLottoBenefitRate(lottoAmount) {
    this.calculateTotalBenefit();
    return Utils.getBenefitRate(
      this.totalBenefit,
      lottoAmount * Lotto.LOTTO_PRICE
    );
  }
}

export default LottoScore;
