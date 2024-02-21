import OPTIONS from '../constant/Options.js';
import Random from '../util/random/Random.js';
import PurchaseAmountValidator from '../util/validation/PurchaseAmountValidator.js';
import Lotto from './Lotto.js';

class LottoMachine {
  calculateIssueQuantity(purchaseAmount) {
    PurchaseAmountValidator.validate(purchaseAmount);

    return parseInt(purchaseAmount / OPTIONS.LOTTO.price, 10);
  }

  issueLottos(issueQuantity) {
    return Array.from(
      { length: issueQuantity },
      () => new Lotto(this.#pickLottoNumbers())
    );
  }

  #pickLottoNumbers() {
    return Random.pickCombination(
      OPTIONS.LOTTO.minNumber,
      OPTIONS.LOTTO.maxNumber,
      OPTIONS.LOTTO.combination
    );
  }
}

export default LottoMachine;
