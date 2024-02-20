import purchaseAmountValidator from "../validator/PurchaseAmountValidator.js";
import InputView from "../view/InputView.js";

class LottoGameController {
  #inputView;

  constructor() {
    this.#inputView = InputView;
  }

  async play() {
    const purchaseAmount = await this.getPurchaseAmount();
  }

  async getPurchaseAmount() {
    const puchaseAmount = await this.#inputView.inputPurchaseAmount();
    purchaseAmountValidator.validate(puchaseAmount);

    return Number(puchaseAmount);
  }
}

export default LottoGameController;
