import LottoMachine from '../models/LottoMachine.js';
import PurchaseLottosView from '../views/PurchaseLottosView.js';
import { $ } from '../utils/utils.js';
import { SELECTOR } from '../constants/constants.js';

export default class PurchaseLottosController {
  #machine = new LottoMachine();
  #view = new PurchaseLottosView();

  constructor() {
    this.#view.bindEvent(
      $(SELECTOR.ID.PURCHASE_MONEY_FORM),
      'submit',
      this.handlePurchaseForm.bind(this)
    );
    this.#view.bindEvent(
      $(SELECTOR.ID.LOTTO_RESULT_TOGGLE),
      'click',
      this.handleResultToggle.bind(this)
    );
  }

  handlePurchaseForm(event) {
    event.preventDefault();
    try {
      this.inputMoney();
      this.#machine.operateLottoMachine();
      this.#view.renderPurchasedLottosAmountByText(this.#machine.lottos);
      this.#view.renderPurchasedLottos(this.#machine.lottos);
      this.#view.disablePurchase();
      this.#view.showLottoContainers();
      this.#machine.checkWinningLottos([1, 2, 3, 4, 5, 6], 7);
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  }

  handleResultToggle() {
    this.#view.renderPurchasedLottos(this.#machine.lottos);
  }

  inputMoney() {
    this.#machine.inputMoney = this.#view.getInputMoney();
  }
}
