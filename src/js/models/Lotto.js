import { getRandomNumber } from '../utils/data-manager.js';

export default class Lotto {
  #pickedNumber = [];

  pushNumberIntoPickedNumber(number) {
    if (this.#pickedNumber.includes(number) === true) {
      return;
    }

    if (this.#pickedNumber.length >= 6) {
      return;
    }

    this.#pickedNumber.push(number);
  }

  generate() {
    while (this.#pickedNumber.length !== 6) {
      this.pushNumberIntoPickedNumber(getRandomNumber(1, 45));
    }

    return this;
  }

  get pickedNumber() {
    return this.#pickedNumber;
  }
}
