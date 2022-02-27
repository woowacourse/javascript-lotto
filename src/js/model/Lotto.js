import { LOTTO } from '../constants/constants';
import { generateRandomNumber, shuffleNumber } from '../utils/number';

export default class Lotto {
  constructor() {
    this.lottoNumbers = [];
    this.generateLottoNumbers();
  }

  generateLottoNumbers() {
    const candidate = Array(45)
      .fill()
      .map((element, index) => index + 1);

    while (this.lottoNumbers.length < 6) {
      shuffleNumber(candidate);
      const pickedNumber = candidate.splice(0, 1)[0];
      this.lottoNumbers.push(pickedNumber);
    }
  }
}
