import Core from "../constants/Core.js";

class Lottos {
  #lottos;
  #benefitBoard;

  constructor(lottos) {
    this.#lottos = lottos;
    this.#benefitBoard = Core.benefitBoard;
  }

  getLottos() {
    return this.#lottos;
  }

  getBenefitBoard() {
    return this.#benefitBoard;
  }


  resetLottos() {
    this.#lottos = [];
  }

  compareLottosWithWinningLotto(winningLotto, bonusNumber) {
    this.#lottos.forEach((lotto) => {
      lotto.compareNumbers(winningLotto)
      lotto.checkBonusNumber(bonusNumber)
    })
  }
}

export default Lottos;
