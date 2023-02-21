import { LOTTO, AVAILABLE_NUMBERS } from '../constant/setting';
import shuffle from '../util/shuffle';

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

    return lotto;
  }
}

export default LottoMachine;
