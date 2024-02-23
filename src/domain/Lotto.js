class Lotto {
  #budget;
  constructor(budget) {
    this.#budget = budget;
  }

  calculateIssuedLottoCount() {
    return Number(this.#budget / 1000);
  }
}

export default Lotto;
