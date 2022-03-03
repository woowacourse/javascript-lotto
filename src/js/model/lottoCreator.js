import { LOTTO } from '../utils/constants.js';

export default class LottoCreator {
  #lottoList;

  #purchaseMoney;

  constructor() {
    this.#lottoList = [];
    this.#purchaseMoney = 0;
  }

  get lottoList() {
    return this.#lottoList;
  }

  get purchaseMoney() {
    return this.#purchaseMoney;
  }

  set purchaseMoney(value) {
    this.#purchaseMoney = value;
  }

  createLottoList() {
    const lottoCount = this.#purchaseMoney / LOTTO.COST_UNIT;

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
