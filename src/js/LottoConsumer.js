import { shuffleArray, createRandomNumberList } from './utils';
import { LOTTO } from './constants';

export default class LottoConsumer {
  #lottoList = [];

  setLottoList(count) {
    this.#lottoList = Array(count)
      .fill(0)
      .map((_, index, list) => (list[index] = this.createLottoList(count)));
  }

  getLottoList() {
    return this.#lottoList;
  }

  createLottoList() {
    const shuffleRandomList = shuffleArray(createRandomNumberList());

    return Array(LOTTO.LENGTH)
      .fill(0)
      .map((_, index, list) => (list[index] = shuffleRandomList.pop()));
  }
}
