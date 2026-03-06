class Money {
  static UNIT = 1000;
  #amount;

  constructor(amount) {
    this.#validate(Number(amount));
    this.#amount = Number(amount);
  }

  #validate(amount) {
    if (amount < Money.UNIT) {
      throw new Error("[ERROR] 로또를 구매할 수 없습니다");
    }
  }

  getMaximumLottoCount() {
    return Math.floor(this.#amount / Money.UNIT);
  }
}

export default Money;
