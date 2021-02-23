import { getRandomNumber } from '../util/index.js';
import {
  UNIT_AMOUNT,
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
  LOTTO_NUMBER_COUNT,
} from '../constants/index.js';
import { Lotto } from './Lotto.js';

export class LottoMachine {
  #lottos = [];

  get lottos() {
    return [...this.#lottos];
  }

  publishLottosByAuto(money) {
    const count = money / UNIT_AMOUNT;

    for (let i = 0; i < count; i++) {
      const numbers = this.getRandomLottoNumbers();

      this.#lottos.push(new Lotto(numbers));
    }
  }

  getRandomLottoNumbers() {
    const numbers = [];

    while (numbers.length < LOTTO_NUMBER_COUNT) {
      const randomNumber = getRandomNumber(MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER);

      if (!numbers.find(number => number === randomNumber)) {
        numbers.push(randomNumber);
      }
    }

    return numbers;
  }
}
