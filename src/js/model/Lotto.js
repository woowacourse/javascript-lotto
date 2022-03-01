import { getValues } from '../utils.js';
import { CONDITIONS } from '../constants/constants.js';

export class Lotto {
  constructor() {
    this.numbers = [];
    this.makeLottoNumber();
  }

  makeLottoNumber() {
    const tempLottoNumbers = new Set();
    while (tempLottoNumbers.size < CONDITIONS.LOTTO_SIZE) {
      tempLottoNumbers.add(getValues.randomInt(CONDITIONS.LOTTO_NUM_MIN, CONDITIONS.LOTTO_NUM_MAX));
    }
    this.numbers = [...tempLottoNumbers];
  }
}
