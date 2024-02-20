import { LOTTO_RULES, ERROR_MESSAGES } from '../constant/index.js';

export default class Lotto {
  constructor(numbers) {
    if (numbers.length !== LOTTO_RULES.length) {
      throw new Error(ERROR_MESSAGES.incorrect_length);
    }

    if (new Set(numbers).size !== numbers.length) {
      throw new Error(ERROR_MESSAGES.duplicate);
    }
  }
}
