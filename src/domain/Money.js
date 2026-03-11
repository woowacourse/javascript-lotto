import { Validator } from "../utils/Validator.js";

class Money {
  #amount;

  constructor(amount) {
    const parsed = Validator.isNumber(amount);
    this.#validate(parsed);
    this.#amount = parsed;
  }

  #validate(amount) {
    if (!Number.isInteger(amount)) {
      throw new Error("[ERROR] 금액은 정수여야 합니다.");
    }
    if (amount <= 0) {
      throw new Error("[ERROR] 금액은 양수여야 합니다.");
    }
  }

  getAmount() {
    return this.#amount;
  }
}

export default Money;
