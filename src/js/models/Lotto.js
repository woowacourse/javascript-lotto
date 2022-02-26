import { getRandomNumber } from '../utils/data-manager';
import { LOTTO_SETTING } from '../constants/setting';

export default class Lotto {
  #pickedNumberList = [];

  pushNumberIntoPickedNumber(number) {
    if (this.#pickedNumberList.includes(number)) {
      return;
    }

    if (this.#pickedNumberList.length >= LOTTO_SETTING.LOTTO_NUMBER_LENGTH) {
      return;
    }

    this.#pickedNumberList.push(number);
  }

  generate() {
    const { LOTTO_NUMBER_LENGTH, MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER } = LOTTO_SETTING;
    while (this.#pickedNumberList.length !== LOTTO_NUMBER_LENGTH) {
      this.pushNumberIntoPickedNumber(getRandomNumber(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER));
    }

    return this;
  }

  get pickedNumber() {
    return this.#pickedNumberList;
  }
}
