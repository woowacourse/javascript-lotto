class Money {
  static UNIT = 1000;

  static ERROR = Object.freeze({
    INSUFFICIENT_AMOUNT: "[ERROR] 로또를 구매할 수 없습니다.",
  });

  #amount;

  constructor(amount) {
    this.#validate(Number(amount));
    this.#amount = Number(amount);
  }

  #validate(amount) {
    if (Number.isNaN(amount) || amount < Money.UNIT) {
      throw new Error(Money.ERROR.INSUFFICIENT_AMOUNT);
    }
  }

  getMaximumLottoCount() {
    return Math.floor(this.#amount / Money.UNIT);
  }
}

export default Money;
