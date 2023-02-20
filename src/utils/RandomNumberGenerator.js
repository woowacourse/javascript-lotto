const {
  LOTTO_NUMBER_RANGE,
  LOTTO_NUMBER_COUNT,
} = require('../constants/constants');

class RandomNumberGenerator {
  #lottoNumbers = [];

  generateRandomNumber() {
    return Math.floor(
      Math.random() *
        (LOTTO_NUMBER_RANGE.MAX_LOTTO_NUMBER -
          LOTTO_NUMBER_RANGE.MIN_LOTTO_NUMBER) +
        LOTTO_NUMBER_RANGE.MIN_LOTTO_NUMBER
    );
  }

  generateLottoNumbers() {
    this.#lottoNumbers = Array.from({ length: LOTTO_NUMBER_COUNT }).map(() => {
      return this.fillLottoNumbers();
    });

    return this.sortLottoNumbers(this.#lottoNumbers);
  }

  fillLottoNumbers() {
    const randomNumber = this.generateRandomNumber();
    if (!this.isNumberDuplicate(randomNumber)) return randomNumber;

    return this.fillLottoNumbers();
  }

  isNumberDuplicate(randomNumber) {
    return this.#lottoNumbers.includes(randomNumber);
  }

  sortLottoNumbers() {
    return this.#lottoNumbers.sort((a, b) => a - b);
  }
}

module.exports = RandomNumberGenerator;
