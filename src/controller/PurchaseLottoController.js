import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

class PurchaseLottoController {
  #purchaseLottoService;

  constructor() {}

  async run() {
    await this.#purchase();
    this.#printPurchaseCount();
    this.#printPurchasedLotto();
  }

  getLottos() {
    return this.#purchaseLottoService.getLottos();
  }

  async #purchase() {
    this.#purchaseLottoService = await InputView.readPurchaseMoney();
  }

  #printPurchaseCount() {
    const purchaseCount = this.#purchaseLottoService.getPurchaseCount();
    OutputView.printPurchaseCount(purchaseCount);
  }

  #printPurchasedLotto() {
    this.getLottos().forEach(lotto => OutputView.printLotto(lotto));
    OutputView.print('');
  }
}

export default PurchaseLottoController;
