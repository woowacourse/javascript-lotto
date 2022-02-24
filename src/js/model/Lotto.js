import { RULES } from '../constants/index.js';
import { pickLottoNumber } from '../utils/common.js';

export default class Lotto {
  #numberList = null;

  constructor() {
    this.#numberList = pickLottoNumber(RULES.LOTTO_NUMS);
  }

  getList() {
    return this.#numberList;
  }
}
