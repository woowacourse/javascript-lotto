const Random = {
  randomNumbers: [],
  generateRandomNumbers() {
    while (this.randomNumbers.length < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1;
      if (!this.isDuplicated(randomNumber)) {
        this.randomNumbers.push(randomNumber);
      }
    }
    return this.randomNumbers;
  },

  isDuplicated(number) {
    return this.randomNumbers.includes(number);
  },
};

module.exports = Random;
