const { LOTTO_RANGE, LOTTO_SIZE } = require("../constants");

const Random = {
  generateRandomNumbers() {
    const randomNumbers = [];
    while (randomNumbers.length < LOTTO_SIZE) {
      this.generateRandomNumber(randomNumbers);
    }
    return randomNumbers;
  },

  generateRandomNumber(randomNumbers) {
    const number =
      Math.floor(Math.random() * (LOTTO_RANGE.MAX - LOTTO_RANGE.MIN + 1)) +
      LOTTO_RANGE.MIN;
    if (!this.isDuplicated(randomNumbers, number)) {
      randomNumbers.push(number);
    }
  },

  isDuplicated(numbers, number) {
    return numbers.includes(number);
  },
};

module.exports = Random;
