import randomLottoArray from "./randomLottoMaker.js";

class Lotto {
  #budget;
  constructor(budget) {
    this.#budget = budget;
  }

  calculateIssuedLottoCount() {
    return Number(this.#budget / 1000);
  }

  IssuedLotto(issuedLottoCount) {
    return randomLottoArray(issuedLottoCount);
  }
}

export default Lotto;
