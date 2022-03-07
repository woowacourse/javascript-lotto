import { RULES } from '../constants/index.js';
import { pickLottoNumber } from '../utils/common.js';

export default class LottoNumbers {
  #numbers = null;

  constructor() {
    this.#numbers = pickLottoNumber(RULES.LOTTO_NUMS);
  }

  get numbers() {
    return this.#numbers;
  }

  calculateMatchCount(winNumbers, bonusNumber) {
    const { length: matchCount } = this.#numbers.filter(number =>
      winNumbers.includes(number),
    );

    if (matchCount === 5 && this.#numbers.includes(bonusNumber)) {
      return '5+bonus';
    }

    return matchCount;
  }
}
