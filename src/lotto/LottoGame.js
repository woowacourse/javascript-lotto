import { getRandomNumber } from '../utils/random.js';
import { MAX_NUMBER, MIN_NUMBER, NUMBER_LIST_LENGTH } from '../constants.js';

export default class LottoGame {
  #lottoItemList = [];

  #getLottoNumberList() {
    const numberList = new Set();
    while (numberList.size < NUMBER_LIST_LENGTH) {
      numberList.add(getRandomNumber(MIN_NUMBER, MAX_NUMBER));
    }

    return [...numberList];
  }

  initLottoItemList() {
    this.#lottoItemList = [];
  }

  addLottoItem() {
    const lottoNumberList = this.#getLottoNumberList();
    this.#lottoItemList.push(lottoNumberList);
  }

  get lottoItemList() {
    return this.#lottoItemList;
  }
}
