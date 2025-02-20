import { getRandomNumberInRange } from '../util/randomNumber.js';
import Lotto from './Lotto.js';

class LottoMachine {
  #generateLottoNumbers() {
    const lottoNumbers = [];
    while (lottoNumbers.length !== 6) {
      const randomNumber = getRandomNumberInRange();
      if (!lottoNumbers.includes(randomNumber)) {
        lottoNumbers.push(randomNumber);
      }
    }
    return lottoNumbers;
  }

  generateLotto(price) {
    const lottos = [];
    for (let i = 0; i < price / 1000; i++) {
      const lottoNumbers = this.#generateLottoNumbers();
      lottos.push(new Lotto(lottoNumbers));
    }
    return lottos;
  }
}

export default LottoMachine;
