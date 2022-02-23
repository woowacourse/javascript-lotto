import LottoMachine from '../domains/LottoMachine.js';
import $ from './utils.js';
import { ticketImg } from './template.js';

export default class LottoView {
  constructor() {
    this.machine = new LottoMachine();
  }

  bindEvents() {
    $('purchase-money-form').addEventListener(
      'submit',
      this.handlePurchaseForm.bind(this)
    );
  }

  handlePurchaseForm(event) {
    event.preventDefault();
    try {
      this.inputMoney();
      this.machine.operateLottoMachine();
      this.renderLottoResult();
    } catch (e) {
      alert(e.message);
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
  }
}
