import PurchaseLottosView from '../views/PurchaseLottosView.js';
import { $ } from '../utils/utils.js';
import { SELECTOR } from '../constants/constants.js';

export default class PurchaseLottosController {
  #view = new PurchaseLottosView();

  constructor(lottoMachine) {
    this.machine = lottoMachine;
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
      this.machine.operateLottoMachine();
      this.#view.renderPurchasedLottosAmountByText(this.machine.lottos);
      this.#view.renderPurchasedLottos(this.machine.lottos);
      this.#view.disablePurchase();
      this.#view.showLottoContainers();
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  }

  handleResultToggle() {
    this.#view.renderPurchasedLottos(this.machine.lottos);
  }

  inputMoney() {
    this.machine.inputMoney = this.#view.getInputMoney();
  }
}
