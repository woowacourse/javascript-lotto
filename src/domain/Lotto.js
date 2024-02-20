import generateRandomNumberInRange from '../util/generateRandomNumberInRange';

export default class Lotto {
  #lottoNumbers = [];

  constructor() {
    this.#drawLottoNumbers();
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

  get lottoNumbers() {
    return this.#lottoNumbers;
  }
}
