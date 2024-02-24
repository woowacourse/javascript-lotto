class Random {
  static randomPickNumber(min, max) {
    const minNumber = Math.ceil(min);
    const maxNumber = Math.floor(max);
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  }

  static pickCombination(min, max, count, array = []) {
    const number = this.randomPickNumber(min, max);

    if (array.length === count) {
      return array;
    }

    if (array.indexOf(number) < 0) {
      array.push(number);
    }

    return this.pickCombination(min, max, count, array);
  }
}

export default Random;
