import { getRandomNumberInRange } from '../util/randomNumber';
import Lotto from './Lotto.js';

class LottoMachine {
  #price;

  constructor(price) {
    this.#price = price;
  }

  generateLotto() {
    const lottos = [];
    for (let i = 0; i < this.#price / 1000; i++) {
      const lottoNumbers = [];
      while (lottoNumbers.length !== 6) {
        const randomNumber = getRandomNumberInRange();
        if (!lottoNumbers.includes(randomNumber)) {
          lottoNumbers.push(randomNumber);
        }
      }
      lottos.push(new Lotto(lottoNumbers));
    }
    return lottos;
  }
}

export default LottoMachine;
