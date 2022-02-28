import { LOTTO } from './utils/constants.js';

export default class LottoModel {
  #lottoList;

  constructor() {
    this.#lottoList = [];
  }

  get lottoList() {
    return this.#lottoList;
  }

  createLottoList(lottoCount) {
    this.#lottoList = Array.from({ length: lottoCount }).map(() =>
      this.#generateLotto()
    );
  }

  #generateLotto() {
    const lottoNum = new Set();

    while (lottoNum.size < LOTTO.NUMBER_LENGTH) {
      lottoNum.add(this.#generateRandomNum());
    }

    return lottoNum;
  }

  #generateRandomNum() {
    return (
      Math.floor(Math.random() * (LOTTO.MAX_DIGIT - LOTTO.MIN_DIGIT + 1)) +
      LOTTO.MIN_DIGIT
    );
  }
}
