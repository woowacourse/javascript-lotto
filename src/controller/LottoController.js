import PurchaseAmountValidator from '../validator/PurchaseAmountValidator';
import InputView from '../view/InputView';
import Console from '../utils/Console';

class LottoController {
  async start() {
    const purchaseAmount = await Console.errorHandler(this.setPurchaseAmount, this);
  }

  async setPurchaseAmount() {
    const inputValue = await InputView.readPurchaseAmount();
    const convertedInputValue = Number(inputValue);
    this.validatePurchaseAmount(convertedInputValue);
    return convertedInputValue;
  }

  validatePurchaseAmount(inputValue) {
    if (PurchaseAmountValidator.isNotNumber(inputValue))
      throw new Error('[ERROR] 구매 금액은 숫자여야 합니다.');
    if (PurchaseAmountValidator.isNotUnit(inputValue))
      throw new Error('[ERROR] 구매 금액은 1000원 단위여야 합니다.');
    if (PurchaseAmountValidator.isNotMinRange(inputValue))
      throw new Error('[ERROR] 최소 구매 금액은 1000원 입니다');
  }
}

export default LottoController;
