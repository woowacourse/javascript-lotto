import { LOTTO } from '../constants/constants';
import { generateRandomNumber } from '../utils/number';

export default class Lotto {
  constructor() {
    this.lottoNumbers = [];
    this.generateLottoNumbers();
  }

  generateLottoNumbers() {
    while (this.lottoNumbers.length < LOTTO.DIGIT) {
      const randomNumber = generateRandomNumber();
      if (!this.lottoNumbers.includes(randomNumber)) {
        this.lottoNumbers.push(randomNumber);
      }
    }
  }
}
