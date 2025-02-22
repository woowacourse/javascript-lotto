import { LOTTO_NUMBER_LENGTH, MIN_PRICE } from '../constants/common.js';
import { getRandomNumberInRange } from '../util/randomNumber.js';
import Lotto from './Lotto.js';

class LottoMachine {
  #generateLottoNumbers() {
    const lottoNumbers = new Set();
    while (lottoNumbers.size < LOTTO_NUMBER_LENGTH) {
      lottoNumbers.add(getRandomNumberInRange());
    }
    return Array.from(lottoNumbers);
  }

  generateLotto(price) {
    const lottos = [];
    for (let i = 0; i < price / MIN_PRICE; i++) {
      const lottoNumbers = this.#generateLottoNumbers();
      lottos.push(new Lotto(lottoNumbers));
    }
    return lottos;
  }
}

export default LottoMachine;
