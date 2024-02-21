import OPTIONS from '../constant/Options.js';
import PurchaseAmountValidator from '../util/validation/PurchaseAmountValidator.js';

class LottoMachine {
  calculateIssueQuantity(purchaseAmount) {
    PurchaseAmountValidator.validate(purchaseAmount);

    return parseInt(purchaseAmount / OPTIONS.LOTTO.price, 10);
  }
}

export default LottoMachine;
