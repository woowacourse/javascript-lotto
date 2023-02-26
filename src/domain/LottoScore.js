import LOTTO_SCORE from "../constants/LottoBoard";
import MATCHING from "../constants/Matching";
import LOTTO_GAME from "../constants/LottoGame";
import Utils from "../util/Utils";

class LottoScore {
  #lottoRanking;
  #totalBenefit;
  #isContainBonusNumber;

  constructor(lottos) {
    this.lottos = lottos;
    this.#lottoRanking = { ...LOTTO_SCORE.rankingBoard };
    this.#totalBenefit = 0;
    this.#isContainBonusNumber = new Array(lottos.length).fill(false);
  }

  get lottoRanking() {
    return { ...this.#lottoRanking };
  }

  get totalBenefit() {
    const tempTotalBenefit = this.#totalBenefit;
    return tempTotalBenefit;
  }

  setIsContainBonusNumber(index, isContain) {
    this.#isContainBonusNumber[index] = isContain;
  }

  compareLottosScore() {
    this.lottos.forEach((lotto, index) => {
      this.determineAddScore(lotto, index);
    });
  }

  determineAddScore(lotto, index) {
    !this.checkIsFailScore(lotto) && lotto.score === 5
      ? this.determineBonusOrNot(index)
      : this.addScoreBoard(lotto.score);
  }

  determineBonusOrNot(index) {
    this.#isContainBonusNumber[index]
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
        this.#lottoRanking[score] * LOTTO_SCORE.benefitBoard[score];
    }
  }

  getLottoBenefitRate(lottoAmount) {
    this.calculateTotalBenefit();
    return Utils.getBenefitRate(
      this.#totalBenefit,
      lottoAmount * LOTTO_GAME.LOTTO_PRICE
    );
  }

  resetLottoScore() {
    this.#lottoRanking = { ...LOTTO_SCORE.rankingBoard };
    this.#totalBenefit = 0;
  }
}

export default LottoScore;
