import generateRandomNumberInRange from '../util/generateRandomNumberInRange';

export default class Lotto {
  #lottoNumbers = [];

  constructor() {
    this.#drawLottoNumbers();
    this.#sortLottoNumbers();
  }

  #drawLottoNumbers() {
    while (this.#lottoNumbers.length !== 6) {
      const randomNumber = generateRandomNumberInRange();

      this.#hasNotRedundantNumberPush(randomNumber);
    }
  }

  #hasNotRedundantNumberPush(randomNumber) {
    if (!this.#lottoNumbers.includes(randomNumber)) {
      this.#lottoNumbers.push(randomNumber);
    }
  }

  #sortLottoNumbers() {
    this.#lottoNumbers = this.#lottoNumbers.sort((a, b) => a - b);
  }

  get lottoNumbers() {
    return this.#lottoNumbers;
  }
}
