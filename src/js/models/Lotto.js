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

  pushNumberIntoPickedNumber(putNumber) {
    if (this.#isNumberListComplete()) {
      return;
    }

    this.#pickedNumberList.add(putNumber);
  }

  generateNumberList() {
    const { MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER } = LOTTO_SETTING;
    while (this.#isNumberListComplete() === false) {
      const randomNumber = getRandomNumber(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER);
      this.pushNumberIntoPickedNumber(randomNumber);
    }
  }

  get pickedNumber() {
    return [...this.#pickedNumberList];
  }
}
