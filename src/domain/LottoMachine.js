class LottoMachine {
  constructor(money) {
    this.money = money;
  }

  getQuantity() {
    return this.money / 1_000;
  }
}

module.exports = LottoMachine;
