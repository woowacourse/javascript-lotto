class RandomNumber {
  /**
   * @param {number} start
   * @param {number} end
   */
  static pickNumberInRange(start, end) {
    const range = [start, end].sort((a, b) => a < b);

    return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
  }

  /**
   * @param {{start:number , end:number}} range
   * @param {number} length
   * @returns
   */
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
