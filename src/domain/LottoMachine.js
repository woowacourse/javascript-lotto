class LottoMachine {
  constructor(money) {
    this.money = money;
  }

  getQuantity() {
    return this.money / 1_000;
  }

  issueLotto() {
    const pickNumberInRange = (start, end) => {
      return Math.floor(Math.random() * (end + 1 - start)) + start;
    };

    const lotto = new Set();

    while (lotto.size < 6) {
      lotto.add(pickNumberInRange(1, 45));
    }

    return [...lotto];
  }
}

module.exports = LottoMachine;
