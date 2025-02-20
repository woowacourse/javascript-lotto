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
    const lotto = [];

    while (lotto.length < LOTTO.LENGTH) {
      const randomNumber = generateRandomNumber(
        LOTTO.MIN_NUMBER,
        LOTTO.MAX_NUMBER,
      );

      this.#checkHasLotto(lotto, randomNumber);
    }
    return lotto;
  }

  #checkHasLotto(lotto, randomNumber) {
    if (!lotto.includes(randomNumber)) {
      lotto.push(randomNumber);
    }
  }

  get lottos() {
    return this.#lottos;
  }
}

export default LottoMachine;
