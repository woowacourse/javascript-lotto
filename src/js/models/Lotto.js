import { isPositiveInteger } from '../utils/validator';
import { getRandomNumber } from '../utils/data-manager';
import { LOTTO_SETTING } from '../constants/setting';

const isValidRangeNumber = (min, max, number) => number >= min && number <= max;

export default class Lotto {
  #pickedNumbers = [];

  pushNumberIntoPickedNumbers(number) {
    if (!isPositiveInteger(number)) {
      return;
    }

    if (!isValidRangeNumber(1, 45, number)) {
      return;
    }

    if (this.#pickedNumbers.includes(number)) {
      return;
    }

    if (this.#pickedNumbers.length >= LOTTO_SETTING.LOTTO_NUMBER_LENGTH) {
      return;
    }

    this.#pickedNumbers.push(number);
  }

  generate() {
    const { LOTTO_NUMBER_LENGTH, MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER } = LOTTO_SETTING;
    while (this.#pickedNumbers.length !== LOTTO_NUMBER_LENGTH) {
      this.pushNumberIntoPickedNumbers(getRandomNumber(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER));
    }

    return this;
  }

  get pickedNumbers() {
    return this.#pickedNumbers;
  }
}
