import { LOTTO_RULES } from '../constant/index.js';

export default class Lotto {
  constructor(numbers) {
    if (numbers.length !== LOTTO_RULES.length) {
      throw new Error();
    }
  }
}
