import { LOTTO } from '../constants/CONFIGURATIONS.js';
import generateRandomNumber from '../utils/generateRandomNumber.js';
import Lotto from './Lotto.js';

class LottoMachine {
  #lottos = [];

  constructor(lottoCount) {
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

  get lottos() {
    return [...this.#lottos];
  }
}

export default LottoMachine;
