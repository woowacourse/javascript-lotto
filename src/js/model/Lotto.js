import { RULES } from '../constants/index.js';
import { pickLottoNumber } from '../util/common.js';

export default class Lotto {
  #numberList = null;

  constructor() {
    this.#init();
  }

  #init() {
    this.#numberList = pickLottoNumber(RULES.LOTTO_NUMS);
  }

  getList() {
    return this.#numberList;
  }
}
