import LottoMachine from '../domains/LottoMachine.js';
import $ from './utils.js';

export default class LottoView {
  constructor() {
    this.machine = new LottoMachine();
  }

  bindEvents() {
    $('purchase-money-form').addEventListener(
      'submit',
      this.inputMoney.bind(this)
    );
  }

  inputMoney(event) {
    event.preventDefault();
    try {
      this.machine.inputMoney = Number($('purchase-money-input').value);
    } catch (e) {
      alert(e.message);
    }
  }
}
