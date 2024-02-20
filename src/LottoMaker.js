class LottoMaker {
  #amount;

  constructor(purchaseAmount) {
    this.#amount = parseInt(purchaseAmount, 10) / 1000;
  }

  run() {
    return Array.from({ length: this.#amount }).map(() => this.make());
  }

  make() {
    const lotto = [];
    while (lotto.length < 6) {
      const randomNumber = Math.ceil(Math.random() * 45);
      if (lotto.includes(randomNumber)) continue;
      lotto.push(randomNumber);
    }
    return lotto;
  }
}

export default LottoMaker;
