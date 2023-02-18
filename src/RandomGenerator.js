const RandomGenerator = {
  shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  },

  generateOrderNumbers(endNumber) {
    return Array.from({ length: endNumber }, (_, i) => i + 1);
  },

  pickRandomNumbers(endNumber, size) {
    const numbers = this.generateOrderNumbers(endNumber);
    return this.shuffle(numbers).slice(0, size);
  },
};

export default RandomGenerator;
