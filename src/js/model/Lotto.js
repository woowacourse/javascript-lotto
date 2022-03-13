import { LOTTO_DIGIT } from './constants';
import { generateRandomNumber } from '../utils/number';

export default class Lotto {
  constructor() {
    this.lottoNumbers = [];
    this.matchedCount = 0;
    this.generateLottoNumbers();
  }

  #getLottoNumbers = () => this.lottoNumbers;

  setLottoNumbers = lottoNumbers => {
    this.lottoNumbers = lottoNumbers;
  }

  getMatchedCount = () => this.matchedCount;

  setMatchedCount = matchedCount => {
    this.matchedCount = matchedCount;
  }

  generateLottoNumbers = () => {
    while (this.#getLottoNumbers().length < LOTTO_DIGIT) {
      const randomNumber = generateRandomNumber();
      if (!this.#getLottoNumbers().includes(randomNumber)) {
        this.#getLottoNumbers().push(randomNumber);
      }
    }
  };
}
