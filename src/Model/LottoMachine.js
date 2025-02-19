import { getRandomNumberInRange } from '../util/randomNumber';
import Lotto from './Lotto.js';

class LottoMachine {
  #price;

  constructor(price) {
    this.#price = price;
  }

  #generateUniqueRandomNumber(lottoNumbers) {
    const randomNumber = getRandomNumberInRange();
    if (!lottoNumbers.includes(randomNumber)) {
      return randomNumber;
    }
  }

  #generateLottoNumbers() {
    const lottoNumbers = [];
    while (lottoNumbers.length !== 6) {
      const uniqueNumber = this.#generateUniqueRandomNumber(lottoNumbers);
      lottoNumbers.push(uniqueNumber);
    }
    return lottoNumbers;
  }

  generateLotto() {
    const lottos = [];
    for (let i = 0; i < this.#price / 1000; i++) {
      const lottoNumbers = this.#generateLottoNumbers();
      lottos.push(new Lotto(lottoNumbers));
    }
    return lottos;
  }
}

export default LottoMachine;
