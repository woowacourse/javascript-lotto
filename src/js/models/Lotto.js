import { getRandomNumber } from '../utils/data-manager.js';
import { LOTTO_SETTING } from '../constants/setting.js';

export default class Lotto {
  #pickedNumber = [];

  pushNumberIntoPickedNumber(number) {
    if (this.#pickedNumber.includes(number)) {
      return;
    }

    if (this.#pickedNumber.length >= LOTTO_SETTING.LOTTO_NUMBER_LENGTH) {
      return;
    }

    this.#pickedNumber.push(number);
  }

  generate() {
    const { LOTTO_NUMBER_LENGTH, MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER } = LOTTO_SETTING;
    while (this.#pickedNumber.length !== LOTTO_NUMBER_LENGTH) {
      this.pushNumberIntoPickedNumber(getRandomNumber(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER));
    }

    return this;
  }

  get pickedNumber() {
    return this.#pickedNumber;
  }
}
