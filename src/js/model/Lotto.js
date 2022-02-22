import { pickLottoNumber } from '../util/common.js';

export default class Lotto {
  constructor() {
    this.init();
  }

  init() {
    this.numberList = pickLottoNumber(6);
  }

  getList() {
    return this.numberList;
  }

  setList(numberList) {
    this.numberList = numberList;
  }
}
