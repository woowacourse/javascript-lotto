import { createLottoList } from './utils';

export default class Lotto {
  #lottoList = [];

  setLotto(count) {
    this.#lottoList = Array(count)
      .fill(0)
      .map((_, index, list) => (list[index] = createLottoList(count)));
  }

  getLotto() {
    return this.#lottoList;
  }
}
