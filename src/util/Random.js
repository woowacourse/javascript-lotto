class Random {
  static randomPickNumber(min, max) {
    const minNumber = Math.ceil(min);
    const maxNumber = Math.floor(max);
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  }

  static pickCombination(min, max, count) {
    const combination = new Set();

    while (combination.size < count) {
      combination.add(this.randomPickNumber(min, max));
    }

    return Array.from(combination);
  }
}

export default Random;
