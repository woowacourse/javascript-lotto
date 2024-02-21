class RandomNumber {
  static pickNumberInRange(start, end) {
    const range = [start, end].sort((a, b) => a < b);

    return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
  }

  static pickUniqueNumbersInRange(range, length) {
    const numbers = new Set();

    while (numbers.size < length) {
      const randomNumber = this.pickNumberInRange(range.start, range.end);

      numbers.add(randomNumber);
    }

    return [...numbers];
  }
}

export default RandomNumber;
