import { LOTTO } from '../constants/constants';
import { shuffleNumber } from '../utils/number';

export default class Lotto {
  constructor() {
    this.lottoNumbers = [];
    this.generateLottoNumbers();
  }

  generateLottoNumbers() {
    const candidate = Array(45)
      .fill()
      .map((element, index) => index + 1);

    const pickedNumbers = shuffleNumber(candidate).slice(0, 6);
    this.lottoNumbers.push(pickedNumbers.join(', '));
  }
}
