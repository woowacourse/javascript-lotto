import { LOTTO } from '../constants/CONFIGURATIONS.js';
import generateRandomNumber from '../utils/generateRandomNumber.js';
import Lotto from './Lotto.js';

class LottoMachine {
  #lottos = [];

  constructor(lottoCount) {
    this.#lottos = this.#generateLottos(lottoCount);
  }

  #generateLottos(lottoCount) {
    const generateLotto = () =>
      generateRandomNumber(LOTTO.MAX_NUMBER, LOTTO.LENGTH)().sort(
        (a, b) => a - b,
      );
    return Array.from({ length: lottoCount }, () => new Lotto(generateLotto()));
  }

  get lottos() {
    return this.#lottos;
  }
}

export default LottoMachine;
