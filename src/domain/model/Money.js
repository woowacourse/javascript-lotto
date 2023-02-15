class Money {
  #amount;

  constructor(amount) {
    this.#amount = amount;
  }

  getAmount() {
    return this.#amount;
  }
}

module.exports = Money;
