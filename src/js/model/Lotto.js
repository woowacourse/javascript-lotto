import { LOTTO_NUMBER } from "../utils/constants.js";
import { getRandomNumber } from "../utils/general.js";

export default class Lotto {
  constructor() {
    this.numbers = [];
  }

  makeRandomNumber() {
    while (this.numbers.length < LOTTO_NUMBER.LENGTH) {
      const randomNumber = getRandomNumber(LOTTO_NUMBER.RANGE_MIN, LOTTO_NUMBER.RANGE_MAX);
      if (!this.numbers.includes(randomNumber)) {
        this.numbers.push(randomNumber);
      }
    }
  }
}
