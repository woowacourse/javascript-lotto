const { LOTTO, AVAILABLE_NUMBERS } = require('../constant/setting');
const shuffle = require('../util/shuffle');

class LottoMachine {
  #money;

  constructor(money) {
    this.#money = money;
  }

  getQuantity() {
    return this.#money / LOTTO.UNIT;
  }

  issueLotto() {
    const lotto = shuffle(AVAILABLE_NUMBERS)
      .slice(LOTTO.INDEX_STARTING_SLICING, LOTTO.INDEX_ENDING_SLICING)
      .sort((a, b) => a - b);

    console.log(lotto);
    return lotto;
  }
}

module.exports = LottoMachine;
