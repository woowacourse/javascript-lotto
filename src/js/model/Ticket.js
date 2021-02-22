export default class Ticket {
  constructor() {
    this.numbers = [];
    this.profit = 0;
  }

  setNumbers(numbers) {
    this.numbers = numbers;
  }

  getNumbers() {
    return this.numbers;
  }
}
