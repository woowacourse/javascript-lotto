import LottoMachine from '../models/LottoMachine.js';
import LottoView from '../views/LottoView.js';
import { $ } from '../utils/utils.js';
import { SELECTOR } from '../constants/constants.js';

export default class LottoController {
  constructor() {
    this.machine = new LottoMachine();
    this.view = new LottoView();
  }

  bindEvents() {
    $(SELECTOR.ID.PURCHASE_MONEY_FORM).addEventListener(
      'submit',
      this.handlePurchaseForm.bind(this)
    );
    $(SELECTOR.ID.LOTTO_RESULT_TOGGLE).addEventListener(
      'click',
      this.handleResultToggle.bind(this)
    );
  }

  handlePurchaseForm(event) {
    event.preventDefault();
    try {
      this.inputMoney();
      this.machine.operateLottoMachine();
      this.view.renderLottoAmount(this.machine.lottos);
      this.view.renderLotto(this.machine.lottos);
      this.view.disablePurchase();
      this.view.showLottoContainers();
    } catch (e) {
      alert(e.message);
    }
  }

  handleResultToggle() {
    this.view.renderLotto(this.machine.lottos);
  }

  inputMoney() {
    this.machine.inputMoney = this.view.getInputMoney();
  }
}
