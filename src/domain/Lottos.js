class Lottos {
  #lottos;
  #lottoRanking;
  #benefitBoard;

  constructor(lottos) {
    this.#lottos = lottos;
    this.#lottoRanking = {
      "3개 일치": 0,
      "4개 일치": 0,
      "5개 일치": 0,
      "5개 일치, 보너스 볼 일치": 0,
      "6개 일치": 0,
    };
    this.#benefitBoard = {
      "3개 일치": 5000,
      "4개 일치": 50000,
      "5개 일치": 1500000,
      "5개 일치, 보너스 볼 일치": 30000000,
      "6개 일치": 2000000000,
    };
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
    if (
      lotto.getScore() === 0 ||
      lotto.getScore() === 1 ||
      lotto.getScore() === 2
    )
      return;
    lotto.getScore() === 5
      ? this.determineBonusOrNot(lotto)
      : this.addScoreBoard(lotto.getScore());
  }

  determineBonusOrNot(lotto) {
    lotto.getIsContainBonusNumber()
      ? this.addScoreBoard("5개 일치, 보너스 볼 일치")
      : this.addScoreBoard("5개 일치");
  }

  addScoreBoard(score) {
    switch (score) {
      case 3:
        this.#lottoRanking["3개 일치"] += 1;
        break;
      case 4:
        this.#lottoRanking["4개 일치"] += 1;
        break;
      case "5개 일치":
        this.#lottoRanking["5개 일치"] += 1;
        break;
      case "5개 일치, 보너스 볼 일치":
        this.#lottoRanking["5개 일치, 보너스 볼 일치"] += 1;
        break;
      case 6:
        this.#lottoRanking["6개 일치"] += 1;
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
      Math.round((this.getTotalBenefit() / this.#lottos.length) * 1000 * 100) /
      100
    );
  }

  resetLottos() {
    this.#lottos = [];
    this.#lottoRanking = {
      "3개 일치": 0,
      "4개 일치": 0,
      "5개 일치": 0,
      "5개 일치, 보너스 볼 일치": 0,
      "6개 일치": 0,
    };
  }
}

export default Lottos;
