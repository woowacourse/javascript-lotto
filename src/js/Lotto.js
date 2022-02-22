export class Lotto {
  constructor() {
    this.numbers = [];
  }

  makeNumbers() {
    const temp = new Set();
    while (temp.size < 7) {
      temp.add(this.getRandomInt(1, 45));
    }
    this.numbers = Array.from(temp);
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
