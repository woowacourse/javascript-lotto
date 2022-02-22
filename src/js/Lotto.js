export class Lotto {
  constructor() {
    this.numbers = [];
  }

  makeNumbers() {
    for (let i = 0; i < 7; i++) {
      this.numbers.push(this.getRandomInt(1, 45));
    }
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
