import { LOTTO } from '../utils/constants.js';

export default class LottoCreator {
  #lottoList;

  constructor() {
    this.#lottoList = [];
    this.lottoMatchingResult = {};
  }

  get lottoList() {
    return this.#lottoList;
  }

  createLottoList(lottoCount) {
    this.#lottoList = Array.from({ length: lottoCount }).map(() => LottoCreator.generateLotto());
  }

  static generateLotto() {
    const lottoNum = new Set();

    while (lottoNum.size < LOTTO.NUMBER_LENGTH) {
      lottoNum.add(LottoCreator.generateRandomNum());
    }

    return Array.from(lottoNum);
  }

  static generateRandomNum() {
    return Math.floor(Math.random() * (LOTTO.MAX_DIGIT - LOTTO.MIN_DIGIT + 1)) + LOTTO.MIN_DIGIT;
  }
}
