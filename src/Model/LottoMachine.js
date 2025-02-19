import { getRandomNumberInRange } from '../util/randomNumber.js';
import Lotto from './Lotto.js';

class LottoMachine {
  constructor(price) {
    this.rankHistory = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    };
  }

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

  calculateRank(rank) {
    if (rank === 1) {
      this.rankHistory.first += 1;
      return;
    }
    if (rank === 2) {
      this.rankHistory.second += 1;
      return;
    }
    if (rank === 3) {
      this.rankHistory.third += 1;
      return;
    }
    if (rank === 4) {
      this.rankHistory.fourth += 1;
      return;
    }
    if (rank === 5) {
      this.rankHistory.fifth += 1;
      return;
    }
  }
}

export default LottoMachine;
