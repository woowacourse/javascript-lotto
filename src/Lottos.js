class Lottos {
  #lottos;
  #lottoRanking;
  #benefitBoard;
  #totalBenefit;
  constructor(lottos) {
    this.#lottos = lottos;
    this.#lottoRanking = {
      3: 0,
      4: 0,
      5: 0,
      "5 bonus": 0,
      6: 0,
    };
    this.#benefitBoard = {
      3: 5000,
      4: 50000,
      5: 1500000,
      "5 bonus": 30000000,
      6: 2000000000,
    };

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

  compareLottosScore() {
    this.#lottos.forEach((lotto) => {
      this.determineAddScore(lotto);
    });
  }

  determineAddScore(lotto) {
    lotto.getScore() === 5
      ? this.determineBonusOrNot(lotto)
      : this.addScoreBoard(lotto.getScore());
  }

  determineBonusOrNot(lotto) {
    lotto.getIsContainBonusNumber()
      ? this.addScoreBoard("5 bonus")
      : this.addScoreBoard("5");
  }

  addScoreBoard(score) {
    this.#lottoRanking[score] += 1;
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
