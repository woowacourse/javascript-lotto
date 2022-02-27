import { createLottoList } from './utils';

export default class Lotto {
  #lottoNumberList = [];

  setLotto() {
    this.#lottoNumberList = createLottoList();
  }

  getLotto() {
    return this.#lottoNumberList;
  }
}
