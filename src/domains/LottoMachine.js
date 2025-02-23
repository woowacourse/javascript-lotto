import { KEY, LOTTO, PURCHASE_PRICE } from '../constants/CONFIGURATIONS.js';
import generateRandomNumber from '../utils/generateRandomNumber.js';
import { validateRange, validateType } from '../validators/validate.js';
import Lotto from './Lotto.js';

class LottoMachine {
  #lottos = [];

  constructor(lottoCount) {
    this.#validateLottoCount(lottoCount);
    this.#lottos = this.#generateLottos(lottoCount);
  }

  #generateLottos(lottoCount) {
    const generateLotto = () => this.#generateLotto().sort((a, b) => a - b);
    return Array.from({ length: lottoCount }, () => new Lotto(generateLotto()));
  }

  #generateLotto() {
    const lottoSet = new Set();

    while (lottoSet.size < LOTTO.NUMBER_LENGTH) {
      const randomNumber = generateRandomNumber(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER);
      lottoSet.add(randomNumber);
    }

    return [...lottoSet];
  }

  #validateLottoCount(count) {
    validateType(KEY.PURCHASE_COUNT, count);
    validateRange({
      key: KEY.PURCHASE_COUNT,
      value: count,
      min: PURCHASE_PRICE.MIN / PURCHASE_PRICE.UNIT,
      max: PURCHASE_PRICE.MAX / PURCHASE_PRICE.UNIT,
    });
  }

  get lottos() {
    return [...this.#lottos];
  }
}

export default LottoMachine;
