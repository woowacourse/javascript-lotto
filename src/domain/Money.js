import CustomError from "../utils/CustomError.js";
import { validateTypeInteger } from "../utils/validator.js";

const MONEY_MIN = 1;

export default class Money {
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
    if (amount < MONEY_MIN) {
      throw new CustomError(`금액은 ${MONEY_MIN} 이상이어야 합니다.`);
    }
  }
}
