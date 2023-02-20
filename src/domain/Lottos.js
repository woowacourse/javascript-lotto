class Lottos {
  #lottos;

  constructor(lottos) {
    this.#lottos = lottos;
  }

  get lottos() {
    return [...this.#lottos];
  }

  resetLottos() {
    this.#lottos = [];
  }

  compareLottosWithWinningLotto(winningLotto, bonusNumber) {
    this.#lottos.forEach((lotto) => {
      lotto.compareNumbers(winningLotto);
      lotto.checkBonusNumber(bonusNumber);
    });
  }
}

export default Lottos;
