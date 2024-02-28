/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition */
// import OPTIONS from '../constant/Options.js';
import LottoMachine from '../domain/LottoMachine.js';
// import BonusNumberValidator from '../util/validation/BonusNumberValidator.js';
// import LottoNumbersValidator from '../util/validation/LottoNumbersValidator.js';
import PurchaseAmountValidator from '../util/validation/PurchaseAmountValidator.js';
// import RestartValidator from '../util/validation/RestartValidator.js';
// import OutputView from '../view/OutputView.js';

class LottoController {
  #lottoMachine;

  constructor() {
    this.#lottoMachine = new LottoMachine();
  }

  async getInputAndValidate(input, validateFunction) {
    try {
      return validateFunction(input) ?? input;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async inputPurchaseAmount(purchaseAmount) {
    const validatedPurchaseAmount = await this.getInputAndValidate(purchaseAmount, (input) =>
      PurchaseAmountValidator.validate(parseInt(input.trim(), 10))
    );

    return validatedPurchaseAmount ? parseInt(validatedPurchaseAmount.trim(), 10) : null;
  }

  calculateIssueQuantity(purchaseAmount) {
    return this.#lottoMachine.calculateIssueQuantity(purchaseAmount);
  }
}

export default LottoController;
