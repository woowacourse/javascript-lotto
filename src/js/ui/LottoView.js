import LottoMachine from '../domains/LottoMachine.js';
import $ from './utils.js';
import {
  ticketImg,
  lottoNumberTemplate,
  purchaseMessageTemplate,
} from './template.js';

export default class LottoView {
  constructor() {
    this.machine = new LottoMachine();
  }

  bindEvents() {
    $('purchase-money-form').addEventListener(
      'submit',
      this.handlePurchaseForm.bind(this)
    );
    $('lotto-result-toggle').addEventListener(
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
      this.controlLottoContainers();
    } catch (e) {
      alert(e.message);
    }
  }

  handleResultToggle() {
    this.renderLotto();
  }

  userInputMoney() {
    this.machine.inputMoney = Number($('purchase-money-input').value);
  }

  renderLotto() {
    $('lotto-result-container').replaceChildren();
    $('lotto-result-toggle-checkbox').checked
      ? this.renderLottoNumbers()
      : this.renderLottoImgs();
  }

  renderLottoImgs() {
    this.machine.lottos.map(() => {
      $('lotto-result-container').insertAdjacentHTML('beforeEnd', ticketImg);
    });
  }

  renderLottoNumbers() {
    this.machine.lottos.map((lotto) => {
      $('lotto-result-container').insertAdjacentHTML(
        'beforeEnd',
        lottoNumberTemplate(lotto.numbers.join(', '))
      );
    });
  }

  renderLottoAmount() {
    $('lotto-result-span').textContent = purchaseMessageTemplate(
      this.machine.lottos
    );
  }

  disablePurchase() {
    $('purchase-money-input').disabled = true;
    $('purchase-money-button').disabled = true;
  }

  controlLottoContainers() {
    $('lotto-result-section').hidden = !$('lotto-result-section').hidden;
    $('winning-number-form').hidden = !$('winning-number-form').hidden;
  }
}
