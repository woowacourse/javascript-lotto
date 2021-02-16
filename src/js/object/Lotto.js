export default class Lotto {
  constructor() {
    this.numbers = [];
  }

  setNumbers() {
    for (let i = 0; i < 6; i++) {
      this.numbers.push(i + 1);
    }
  }
}