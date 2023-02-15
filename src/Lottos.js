class Lottos {
  #lottos;
  #lottoRanking;
  constructor(lottos) {
    this.#lottos = lottos;
    this.#lottoRanking = {
      3: 0,
      4: 0,
      5: 0,
      "5 bonus": 0,
      6: 0,
    };
  }

  getLottos() {
    return this.#lottos;
  }

  getLottoRanking() {
    return this.#lottoRanking;
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
}

export default Lottos;
