import InputView from '../view/InputView.js';
import Validation from './Vaildation.js';

export default class LottoGameController {
  play() {
    this.#requestPurchaseAmount();
  }

  async #requestPurchaseAmount() {
    const purchaseAmount = await InputView.readPurchaseAmount();
    Validation.isValidPurchaseAmount(purchaseAmount);
  }
}
