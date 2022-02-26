import { getRandomNumber } from '../utils/validator';
import { NUMBER } from '../constants/number';

class Lotto {
  constructor() {
    this.lottoNumbers = this.createLottoNumbers();
  }

  createLottoNumbers() {
    const lottoArray = new Set();

    while (lottoArray.size < NUMBER.LOTTO_NUMBER_LENGTH) {
      lottoArray.add(getRandomNumber());
    }

    return [...lottoArray];
  }
}

export default Lotto;
