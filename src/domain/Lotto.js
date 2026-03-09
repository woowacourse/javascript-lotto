import { LOTTO_RANGE } from "../constants/constant.js";

class Lotto {
  #number = [];

  constructor(number) {
    this.#number = number;
  }

  static generateRandomLotto() {
    const lottoSet = new Set();
    
    while (lottoSet.size < LOTTO_RANGE.COUNT) {
      lottoSet.add(Math.floor(Math.random() * LOTTO_RANGE.MAX + LOTTO_RANGE.MIN));
    }
    
    const lottoArray = Array.from(lottoSet);
    lottoArray.sort((a, b) => a - b);
    
    return lottoArray;
  }

  getNumber() {
    return [...this.#number];
  }
}

export default Lotto;
