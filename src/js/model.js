import { LOTTO_RULE } from './constants.js';
import { generateRandomNumber } from './utils/common.js';
export default class Model {
  lottoList = [];

  getLottoList() {
    return this.lottoList;
  }

  buyLotto(quantity) {
    this.lottoList = [];
    for (let i = 0; i < quantity; i++) {
      this.lottoList.push(this.makeLottoNumbers());
    }
  }

  makeLottoNumbers() {
    const lottoNumbers = new Set();
    while (lottoNumbers.size < LOTTO_RULE.NUMBERS_COUNT) {
      lottoNumbers.add(generateRandomNumber(LOTTO_RULE.MIN_NUMBER, LOTTO_RULE.MAX_NUMBER));
    }
    return lottoNumbers;
  }
}
