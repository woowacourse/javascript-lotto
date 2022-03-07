import PurchaseLottosView from '../views/PurchaseLottosView.js';
import { $ } from '../utils/utils.js';
import { SELECTOR } from '../constants/constants.js';

export default class PurchaseLottosController {
  constructor(lottoMachine) {
    this.machine = lottoMachine;
    this.view = new PurchaseLottosView();

    this.view.bindEvent(
      $(SELECTOR.ID.PURCHASE_MONEY_FORM),
      'submit',
      this.handlePurchaseForm.bind(this)
    );
    this.view.bindEvent(
      $(SELECTOR.ID.LOTTO_RESULT_TOGGLE),
      'click',
      this.handleResultToggle.bind(this)
    );
  }

  inputMoney() {
    this.machine.inputMoney = this.view.getInputMoney();
  }

  // 핸들러
  handlePurchaseForm(event) {
    event.preventDefault();
    try {
      this.inputMoney();
      this.machine.lottos = this.machine.generateLottos();
      this.view.renderPurchasedLottosAmountByText(this.machine.lottos);
      this.view.renderPurchasedLottos(this.machine.lottos);
      this.view.stopPurchase();
    } catch (error) {
      alert(error.message);
    }
  }

  handleResultToggle() {
    this.view.renderPurchasedLottos(this.machine.lottos);
  }
}
