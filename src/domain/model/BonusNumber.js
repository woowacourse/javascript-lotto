class BonusNumber {
  #number;

  constructor(input) {
    this.#number = Number(input);
  }

  getNumber() {
    return this.#number;
  }
}

module.exports = BonusNumber;
