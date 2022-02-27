import { createRandomNumberList } from './utils';

export default class Lotto {
  #lottoNumberList = [];

  setLotto() {
    this.#lottoNumberList = createRandomNumberList();
  }

  getLotto() {
    return this.#lottoNumberList;
  }
}
