import generateRandomNumber from '../utils/generateRandomNumber';
import values from '../constants/values';

class LottoMachine {
  #lottos

  constructor() {
    this.init();
  }

  init() {
    this.#lottos = [];
  }

  get lottos() {
    return this.#lottos;
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
