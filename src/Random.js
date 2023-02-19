const Random = {
  getnerateRandomNumbers() {
    const randomNumbers = [];
    while (randomNumbers.length < 6) {
      Random.makeRandomNumbers(randomNumbers);
    }
    return randomNumbers;
  },

  makeRandomNumbers(randomNumbers) {
    const number = parseInt(Math.random() * 45 + 1, 10);
    if (randomNumbers.indexOf(number) < 0) {
      return randomNumbers.push(number);
    }
  },
};
export default Random;
