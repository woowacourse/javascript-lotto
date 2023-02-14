const pickNumberInRange = require('../util/pickNumberInRange');

class LottoMachine {
  constructor(money) {
    this.money = money;
  }

  getQuantity() {
    return this.money / 1_000;
  }

  issueLotto() {
    const lotto = new Set();

    while (lotto.size < 6) {
      lotto.add(pickNumberInRange(1, 45));
    }

    return this.arrangeLotto([...lotto]);
  }

  arrangeLotto(lotto) {
    return lotto.sort((a, b) => a - b);
  }
}

module.exports = LottoMachine;
