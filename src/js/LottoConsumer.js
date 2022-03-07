import { shuffleArray, createRandomNumberList } from './utils';
import { LOTTO } from './constants';

export default class LottoConsumer {
  #lottoList = [];

  setLottoList(count) {
    this.#lottoList = Array.from({ length: count }, () =>
      this.createLottoList(count)
    );
  }

  getLottoList() {
    return this.#lottoList;
  }

  createLottoList() {
    const shuffleRandomList = shuffleArray(createRandomNumberList());

    return Array.from({ length: LOTTO.LENGTH }, () => shuffleRandomList.pop());
  }
}
