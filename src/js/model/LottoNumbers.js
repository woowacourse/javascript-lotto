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
}
