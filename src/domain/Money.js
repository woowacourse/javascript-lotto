export default class Money {
  static ERROR = {
    NEGATIVE: "돈은 음수가 될 수 없습니다",
  };

  #amount;

  constructor(amount) {
    this.#validate(amount);
    this.#amount = amount;
  }

  #validate(amount) {
    if (amount < 0) {
      throw new Error(Money.ERROR.NEGATIVE);
    }
  }

  getAmount() {
    return this.#amount;
  }
}
