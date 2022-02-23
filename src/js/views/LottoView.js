import LottoMachine from '../domains/LottoMachine.js';
import $ from './utils.js';
import { ticketImg, lottoNumberTemplate } from './template.js';

export default class LottoView {
  constructor() {
    this.machine = new LottoMachine();
    this.isToggleChecked = $('lotto-result-toggle-checkbox').checked;
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
      this.inputMoney();
      this.machine.operateLottoMachine();
      this.renderLottoResult();
      this.controlLottoContainers();
    } catch (e) {
      alert(e.message);
    }
  }

  handleResultToggle() {
    this.isToggleChecked = $('lotto-result-toggle-checkbox').checked;
    if (this.isToggleChecked) {
      $('lotto-result-container').replaceChildren();
      this.machine.lottos.map((lotto) => {
        $('lotto-result-container').insertAdjacentHTML(
          'beforeEnd',
          lottoNumberTemplate(lotto.numbers.join(', '))
        );
      });
    }
    if (!this.isToggleChecked) {
      $('lotto-result-container').replaceChildren();
      this.machine.lottos.map(() => {
        $('lotto-result-container').insertAdjacentHTML('beforeEnd', ticketImg);
      });
    }
  }

  inputMoney() {
    this.machine.inputMoney = Number($('purchase-money-input').value);
  }

  renderLottoResult() {
    $(
      'lotto-result-span'
    ).textContent = `총 ${this.machine.lottos.length}개를 구매하였습니다.`;

    this.machine.lottos.map(() => {
      $('lotto-result-container').insertAdjacentHTML('beforeEnd', ticketImg);
    });
    this.disablePurchase();
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
