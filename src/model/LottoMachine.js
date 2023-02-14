import generateRandomNumber from '../utils/generateRandomNumber';
import values from '../constants/values';
import Lotto from './Lotto';

class LottoMachine {
  #lottos;

  constructor() {
    this.init();
  }

  init() {
    this.#lottos = [];
  }

  get lottos() {
    return this.#lottos;
  }

  buyLotto(money) {
    for (let i = 0; i < Math.floor(money / 1000); i++) {
      this.#lottos.push(new Lotto(this.generateLottoNumber()));
    }
  }

  generateLottoNumber() {
    const { LOWER_BOUND, UPPER_BOUND } = values;
    const randomLottoNumbers = [];

    for (let i = 0; i < 6; i++) {
      randomLottoNumbers.push(generateRandomNumber(LOWER_BOUND, UPPER_BOUND));
    }

    return randomLottoNumbers;
  }
}

export default LottoMachine;
