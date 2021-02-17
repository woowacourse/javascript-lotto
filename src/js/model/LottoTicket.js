import { getRandomNumber } from '../utils/general.js';
import {
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  LOTTO_NUMBERS_LENGTH,
} from '../constants.js';

export default class LottoTicket {
  constructor() {
    this.numbers = this.createNumbers().sort((a, b) => a - b);
  }

  createNumbers() {
    return new Array(LOTTO_NUMBERS_LENGTH)
      .fill()
      .map((v) =>
        getRandomNumber({ min: LOTTO_MIN_NUMBER, max: LOTTO_MAX_NUMBER })
      );
  }
}
