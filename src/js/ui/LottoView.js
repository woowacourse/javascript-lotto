import LottoMachine from '../domains/LottoMachine.js';
import $ from './utils.js';
import {
  ticketImg,
  lottoNumberTemplate,
  purchaseMessageTemplate,
} from './template.js';
import { SELECTOR } from '../constants/constants.js';

export default class LottoView {
  constructor() {
    this.machine = new LottoMachine();
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
      this.userInputMoney();
      this.machine.operateLottoMachine();
      this.renderLottoAmount();
      this.renderLotto();
      this.disablePurchase();
      this.showLottoContainers();
    } catch (e) {
      alert(e.message);
    }
  }

  handleResultToggle() {
    this.renderLotto();
  }

  userInputMoney() {
    this.machine.inputMoney = Number.parseInt(
      $(SELECTOR.ID.PURCHASE_MONEY_INPUT).value
    );
  }

  renderLotto() {
    $(SELECTOR.ID.LOTTO_RESULT_CONTAINER).replaceChildren();
    $(SELECTOR.ID.TOGGLE_CHECKBOX).checked
      ? this.renderLottoNumbers()
      : this.renderLottoImgs();
  }

  renderLottoImgs() {
    this.machine.lottos.map(() => {
      $(SELECTOR.ID.LOTTO_RESULT_CONTAINER).insertAdjacentHTML(
        'beforeEnd',
        ticketImg
      );
    });
  }

  renderLottoNumbers() {
    this.machine.lottos.map((lotto) => {
      $(SELECTOR.ID.LOTTO_RESULT_CONTAINER).insertAdjacentHTML(
        'beforeEnd',
        lottoNumberTemplate(lotto.numbers.join(', '))
      );
    });
  }

  renderLottoAmount() {
    $(SELECTOR.ID.LOTTO_RESULT_SPAN).textContent = purchaseMessageTemplate(
      this.machine.lottos
    );
  }

  disablePurchase() {
    $(SELECTOR.ID.PURCHASE_MONEY_INPUT).disabled = true;
    $(SELECTOR.ID.PURCHASE_MONEY_BUTTON).disabled = true;
  }

  showLottoContainers() {
    $(SELECTOR.ID.LOTTO_RESULT_SECTION).hidden = false;
    $(SELECTOR.ID.WINNING_NUMBER_FORM).hidden = false;
  }
}
