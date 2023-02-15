const Random = {
  generateRandomNumbers() {
    const randomNumbers = [];
    while (randomNumbers.length < 6) {
      this.generateRandomNumber(randomNumbers);
    }
    return randomNumbers;
  },

  generateRandomNumber(randomNumbers) {
    const number = Math.floor(Math.random() * 45) + 1;
    if (!this.isDuplicated(randomNumbers, number)) {
      randomNumbers.push(number);
    }
  },

  isDuplicated(numbers, number) {
    return numbers.includes(number);
  },
};

module.exports = Random;
