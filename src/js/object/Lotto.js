export default class Lotto {
  constructor() {
    this.numbers = [];
  }

  getNumbers() {
    return [...this.numbers];
  }

  createNumbers() {
    const numberSet = new Set();
    while (numberSet.size < 6) {
      numberSet.add(this.getRandomNumber(1, 45));
    }
    this.numbers = [...numberSet];
  }

  getRandomNumber(start, end) {
    return Math.round((1 - Math.random()) * (end - start)) + start;
  }
}