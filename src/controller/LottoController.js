import { inputPurchaseAmount } from '../view/InputView';

class LottoController {
  #purchaseAmount;

  constructor() {}

  async readPurchaseAmount() {
    const purchaseAmount = await inputPurchaseAmount();
    this.#purchaseAmount = purchaseAmount;
  }
}

export default LottoController;
