import { getRandomNumber } from '../utils/data-manager';
import { LOTTO_SETTING } from '../constants/setting';
import { checkValidLottoNumberInput } from '../utils/Lotto/validator';

export default class Lotto {
  #pickedNumbers = [];

  pushNumberIntoPickedNumbers(number) {
    try {
      checkValidLottoNumberInput({ input: number, pickedNumbers: this.#pickedNumbers });
    } catch (err) {
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
