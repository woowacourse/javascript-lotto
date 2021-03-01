import { LOTTO_NUMBER_COUNT, MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER } from '../utils/constants.js';
import { getRandomNumber } from '../utils/util.js';
import { Lotto } from './Lotto.js';

export default class LottoMachine {
  publishLotto(numbers = this.getRandomLottoNumbers()) {
    return new Lotto(numbers);
  }

  getRandomLottoNumbers() {
    const numbers = [];

    while (numbers.length < LOTTO_NUMBER_COUNT) {
      const randomNumber = getRandomNumber(MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER);

      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }

    return numbers;
  }
}
