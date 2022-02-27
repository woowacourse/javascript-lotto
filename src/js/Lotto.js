import { createRandomNumberList } from './utils.js';

export default class Lotto {
  constructor() {
    this.lottoNumberList = [];
  }

  setLotto() {
    this.lottoNumberList = createRandomNumberList();
  }

  getLotto() {
    return this.lottoNumberList;
  }
}
