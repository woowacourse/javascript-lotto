class RandomNumber {
  static pickNumberInRange(start, end) {
    const range = [start, end].sort((a, b) => a < b);

    return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
  }
}

export default RandomNumber;
