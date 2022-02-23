import { generateRandomNumberInRange } from '../utils/utils';

class Lotto {
  constructor() {
    this.lottoNumbers = new Set();
    this.#generateNumbers();
  }

  #generateNumbers() {
    while (this.lottoNumbers.size !== 6) {
      this.lottoNumbers.add(generateRandomNumberInRange(1, 45));
    }
  }
}

export default Lotto;
