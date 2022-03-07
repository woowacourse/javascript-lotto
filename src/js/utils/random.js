const random = {
  getRandomNumber(max, min) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  },

  generateRandomNumbers({ count, max, min }) {
    const randomNumbers = new Set();

    while (randomNumbers.size < count) {
      randomNumbers.add(this.getRandomNumber(max, min));
    }

    return Array.from(randomNumbers);
  },
};

export default random;
