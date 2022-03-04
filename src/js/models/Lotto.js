import { getRandomNumber } from '../utils/data-manager';
import { LOTTO_SETTING } from '../constants/setting';
import { checkValidLottoNumberInput } from '../utils/Lotto/validator';

function shuffle(list) {
  list.sort(() => Math.random() - 0.5);
  return list;
}

export default class Lotto {
  #pickedNumbers = new Set();

  pushNumberIntoPickedNumbers(number) {
    try {
      checkValidLottoNumberInput({ input: number, pickedNumbers: this.#pickedNumbers });
    } catch (err) {
      return;
    }
    this.#pickedNumbers.add(number);
  }

  generate() {
    const shuffledList = shuffle([...Array(45)].map((_, idx) => idx + 1).sort());
    shuffledList.slice(0, 6).forEach((number) => this.pushNumberIntoPickedNumbers(number));

    return this;
  }

  get pickedNumbers() {
    return this.#pickedNumbers;
  }
}
