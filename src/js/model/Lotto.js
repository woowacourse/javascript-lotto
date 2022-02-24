import { LOTTO_DIGIT } from './constants';
import { generateRandomNumber } from '../utils/number';

export default class Lotto {
  constructor() {
    this.lottoNumbers = [];
    this.generateLottoNumbers();
  }

  generateLottoNumbers() {
    while (this.lottoNumbers.length < LOTTO_DIGIT) {
      const randomNumber = generateRandomNumber();
      if (!this.lottoNumbers.includes(randomNumber)) {
        this.lottoNumbers.push(randomNumber);
      }
    }
  }
}
