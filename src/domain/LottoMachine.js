const { LOTTO } = require('../constant/Setting');
const pickNumberInRange = require('../util/pickNumberInRange');

class LottoMachine {
  #money;

  constructor(money) {
    this.#money = money;
  }

  getQuantity() {
    return this.#money / LOTTO.UNIT;
  }

  issueLotto() {
    const lotto = new Set();

    while (lotto.size < LOTTO.LENGTH) {
      lotto.add(pickNumberInRange(LOTTO.MIN_NUMBER_RANGE, LOTTO.MAX_NUMBER_RANGE));
    }

    return this.arrangeLotto([...lotto]);
  }

  arrangeLotto(lotto) {
    return lotto.sort((a, b) => a - b);
  }
}

module.exports = LottoMachine;
