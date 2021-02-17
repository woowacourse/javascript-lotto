import { getRandomNumber } from '../utils/general.js';
import { LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER, LOTTO_NUMBERS_LENGTH } from '../constants.js';

export default class LottoTicket {
  constructor() {
    this.numbers = this.createLottoNumbers().sort((a, b) => a - b);
  }

  createLottoNumbers(array = []) {
    const number = getRandomNumber({ min: LOTTO_MIN_NUMBER, max: LOTTO_MAX_NUMBER });

    if (array.length >= LOTTO_NUMBERS_LENGTH) {
      return array;
    }

    if (array.indexOf(number) === -1) {
      array.push(number);
    }

    return this.createLottoNumbers(array);
  }
}
