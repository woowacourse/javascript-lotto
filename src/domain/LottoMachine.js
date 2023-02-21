import { LOTTO } from '../constant/setting';
import pickNumberInRange from '../util/pickNumberInRange';

class LottoMachine {
  #purchaseAmount;

  constructor(purchaseAmount) {
    this.#purchaseAmount = purchaseAmount;
  }

  getQuantity() {
    return this.#purchaseAmount / LOTTO.UNIT;
  }

  issueLottos() {
    return Array.from({ length: this.getQuantity() }, () => this.#issueLotto());
  }

  #issueLotto() {
    const lotto = new Set();

    while (lotto.size < LOTTO.SIZE) {
      lotto.add(pickNumberInRange(LOTTO.MIN_NUMBER_RANGE, LOTTO.MAX_NUMBER_RANGE));
    }

    return [...lotto].sort((first, second) => first - second);
  }
}

export default LottoMachine;
