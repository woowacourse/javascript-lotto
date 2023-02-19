const Random = {
  generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  isDuplicated(numbers, number) {
    return numbers.includes(number);
  },
};

module.exports = Random;
