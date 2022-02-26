import { getRandomNumber } from '../utils/data-manager';
import { LOTTO_SETTING } from '../constants/setting';

export default class Lotto {
  #pickedNumberList = new Set();

  #isNumberListComplete() {
    if (this.#pickedNumberList.size !== LOTTO_SETTING.LOTTO_NUMBER_LENGTH) {
      return false;
    }

    return true;
  }

  pushNumberIntoPickedNumber(testNumber = null) {
    if (this.#isNumberListComplete()) {
      return;
    }

    const { MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER } = LOTTO_SETTING;
    const randomNumber = getRandomNumber(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER);

    this.#pickedNumberList.add(testNumber || randomNumber);
  }

  generateNumberList() {
    while (this.#isNumberListComplete() === false) {
      this.pushNumberIntoPickedNumber();
    }
  }

  get pickedNumber() {
    return [...this.#pickedNumberList];
  }
}
