const RandomGenerator = {
  shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  },

  pickRandomNumbers() {
    const numbers = Array.from({ length: 45 }, (_, i) => i + 1);
    return this.shuffle(numbers).slice(0, 6);
  },
};

export default RandomGenerator;
