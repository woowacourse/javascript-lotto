import Lotto from './Lotto.js';
import pickNumberInRange from '../utils/pickNumberInRange.js';
import { LOTTO_CONDITION } from '../constants/condition.js';

export default class LottoGame {
  #lottos;

  constructor() {
    this.#lottos = [];
  }

  makeLotto(lottoNumbers) {
    const lotto = new Lotto(lottoNumbers);

    this.#lottos.push(lotto);
  }

  generateLottoNumbers(lottoDigits) {
    const numbers = new Set();

    while (numbers.size !== lottoDigits) {
      const number = pickNumberInRange(
        LOTTO_CONDITION.lottoNumberMinRange,
        LOTTO_CONDITION.lottoNumberMaxRange
      );

      numbers.add(number);
    }

    return [...numbers].sort((numA, numB) => numA - numB);
  }

  getLottoQuantity() {
    return this.#lottos.length;
  }
}
