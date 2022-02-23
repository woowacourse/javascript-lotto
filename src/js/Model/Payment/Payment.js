export default class Payment {
  constructor(amount) {
    this.amount = amount;
  }

  getNumberOfLotto() {
    return parseInt(this.amount / 1000, 10);
  }
}
