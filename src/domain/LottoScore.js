import LOTTO_BOARD from "../constants/LottoBoard";
import MATCHING from "../constants/Matching";
import LOTTO_GAME from "../constants/LottoGame";
import Utils from "../util/Utils";

class LottoScore {
  #lottoRanking;
  #totalBenefit;

  constructor(lottos) {
    this.lottos = lottos;
    this.#lottoRanking = { ...LOTTO_BOARD.rankingBoard };
    this.#totalBenefit = 0;
  }

  get lottoRanking() {
    return { ...this.#lottoRanking };
  }

  get totalBenefit() {
    const tempTotalBenefit = this.#totalBenefit;
    return tempTotalBenefit;
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
      ? this.addScoreBoard(MATCHING.SECOND)
      : this.addScoreBoard(MATCHING.THIRD);
  }

  checkIsFailScore(lotto) {
    return (
      lotto.score === MATCHING.ZERO ||
      lotto.score === MATCHING.ONE ||
      lotto.score === MATCHING.TWO
    );
  }

  addScoreBoard(score) {
    switch (score) {
      case MATCHING.THREE:
        this.#lottoRanking[MATCHING.FIFTH] += 1;
        break;
      case MATCHING.FOUR:
        this.#lottoRanking[MATCHING.FOURTH] += 1;
        break;
      case MATCHING.THIRD:
        this.#lottoRanking[MATCHING.THIRD] += 1;
        break;
      case MATCHING.SECOND:
        this.#lottoRanking[MATCHING.SECOND] += 1;
        break;
      case MATCHING.SIX:
        this.#lottoRanking[MATCHING.FIRST] += 1;
    }
  }

  calculateTotalBenefit() {
    for (const score in this.#lottoRanking) {
      this.#totalBenefit +=
        this.#lottoRanking[score] * LOTTO_BOARD.benefitBoard[score];
    }
  }

  getLottoBenefitRate(lottoAmount) {
    this.calculateTotalBenefit();
    return Utils.getBenefitRate(
      this.#totalBenefit,
      lottoAmount * LOTTO_GAME.LOTTO_PRICE
    );
  }
}

export default LottoScore;
