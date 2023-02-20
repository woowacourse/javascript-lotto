import { ERROR, MATCH, SCORE } from "../constants/Config.js";

class Lottos {
  #lottos;
  #lottoRanking;
  #benefitBoard;
  #totalBenefit;
  constructor(lottos) {
    this.#lottos = lottos;
    this.#lottoRanking = { ...MATCH.LOTTO_RANKIG };
    this.#benefitBoard = { ...MATCH.BENEFIT_BOARD };
    this.#totalBenefit = 0;
  }

  getLottos() {
    return this.#lottos;
  }

  getLottoRanking() {
    return this.#lottoRanking;
  }

  getTotalBenefit() {
    return this.#totalBenefit;
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
    const failScore = [SCORE.ZERO, SCORE.ONE, SCORE.TWO];
    const score = lotto.getScore();

    if (failScore.includes(score)) return;
    score === 5 ? this.determineBonusOrNot(lotto) : this.addScoreBoard(score);
  }

  determineBonusOrNot(lotto) {
    lotto.getIsContainBonusNumber()
      ? this.addScoreBoard(SCORE.FIVE_BONUS)
      : this.addScoreBoard(SCORE.FIVE);
  }

  addScoreBoard(score) {
    switch (score) {
      case 3:
        this.#lottoRanking[SCORE.THREE] += 1;
        break;
      case 4:
        this.#lottoRanking[SCORE.FOUR] += 1;
        break;
      case "5개 일치":
        this.#lottoRanking[SCORE.FIVE] += 1;
        break;
      case "5개 일치, 보너스 볼 일치":
        this.#lottoRanking[SCORE.FIVE_BONUS] += 1;
        break;
      case 6:
        this.#lottoRanking[SCORE.SIX] += 1;
        break;
      default:
        throw new Error(ERROR.DEFAULT_ERROR);
    }
  }

  calculateBenefit() {
    for (const score in this.#lottoRanking) {
      this.#totalBenefit +=
        this.#lottoRanking[score] * this.#benefitBoard[score];
    }
  }

  getBenefitRate(money) {
    return Math.round((this.#totalBenefit / money) * 100) / 100;
  }
}

export default Lottos;
