import Core from "../constants/Core.js";
import Lotto from "../constants/Lotto.js";
import Score from "../constants/Score.js";

class Lottos {
  #lottos;
  #lottoRanking;
  #benefitBoard;

  constructor(lottos) {
    this.#lottos = lottos;
    this.#lottoRanking = Core.rankingBoard;
    this.#benefitBoard = Core.benefitBoard;
  }

  getLottos() {
    return this.#lottos;
  }

  getLottoRanking() {
    return this.#lottoRanking;
  }

  getBenefitBoard() {
    return this.#benefitBoard;
  }

  compareLottosScore() {
    this.#lottos.forEach((lotto) => {
      this.determineAddScore(lotto);
    });
  }

  determineAddScore(lotto) {
    if (this.checkIsFailScore(lotto)) {
      return;
    }
    lotto.getScore() === 5
      ? this.determineBonusOrNot(lotto)
      : this.addScoreBoard(lotto.getScore());
  }

  determineBonusOrNot(lotto) {
    lotto.getIsContainBonusNumber()
      ? this.addScoreBoard(Score.FIVE_BONUS)
      : this.addScoreBoard(Score.FIVE);
  }

  checkIsFailScore(lotto) {
    return (
      lotto.getScore() === Score.ZERO ||
      lotto.getScore() === Score.ONE ||
      lotto.getScore() === Score.TWO
    );
  }

  addScoreBoard(score) {
    switch (score) {
      case Score.THREE:
        this.#lottoRanking[Score.THREE] += 1;
        break;
      case Score.FOUR:
        this.#lottoRanking[Score.FOUR] += 1;
        break;
      case Score.FIVE:
        this.#lottoRanking[Score.FIVE] += 1;
        break;
      case Score.FIVE_BONUS:
        this.#lottoRanking[Score.FIVE_BONUS] += 1;
        break;
      case Score.SIX:
        this.#lottoRanking[Score.SIX] += 1;
    }
  }

  getTotalBenefit() {
    let totalBenefit = 0;
    for (const score in this.#lottoRanking) {
      totalBenefit += this.#lottoRanking[score] * this.#benefitBoard[score];
    }
    return totalBenefit;
  }

  getBenefitRate() {
    return (
      Math.round(
        (this.getTotalBenefit() / this.#lottos.length) * Lotto.LOTTO_PRICE * 100
      ) / 100
    );
  }

  resetLottos() {
    this.#lottos = [];
    this.#lottoRanking = Core.rankingBoard;
  }
}

export default Lottos;
