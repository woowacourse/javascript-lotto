import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import Validation from './Vaildation.js';

export default class LottoGameController {
  play() {
    this.#requestPurchaseAmount();
  }

  async #requestPurchaseAmount() {
    const purchaseAmount = await InputView.readPurchaseAmount();

    try {
      Validation.isValidPurchaseAmount(purchaseAmount);

      return Number(purchaseAmount);
    } catch ({ message }) {
      OutputView.printErrorMessage(message);

      return this.#requestPurchaseAmount();
    }
  }
}
