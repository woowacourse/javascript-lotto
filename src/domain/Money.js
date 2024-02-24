import { validateTypeInteger } from "../utils/validator.js";

export default class Money {
  static MIN_AMOUNT = 1;

  #amount;

  constructor(amount) {
    validateTypeInteger(amount);

    this.#validateOverMinAmount(amount);

    this.#amount = amount;
  }

  getAmount() {
    return this.#amount;
  }

  #validateOverMinAmount(amount) {
    if (amount < Money.MIN_AMOUNT) {
      throw new Error(`[ERROR] 금액은 ${Money.MIN_AMOUNT} 이상이어야 합니다.`);
    }
  }
}
