import { LOTTO_PRICE } from './constants';
import { $, divider } from './util';
import { validateCharge } from './validation';

import LottoManager from './LottoManager';

export default class LottoMachine {
  constructor() {
    this.setEvent();
    this.lottoManager = new LottoManager();
  }

  setEvent() {
    $("#charge-submit-form").addEventListener("submit", this.onSubmitCharge.bind(this));
  }

  onSubmitCharge(event) {
    event.preventDefault();
    const chargeInputNumber = Number($("#charge-input").value);
    try {
      validateCharge(chargeInputNumber);
    } catch (error) {
      alert(error.message);
      return;
    }
    const { quotient: newLottoCount } = divider(chargeInputNumber, LOTTO_PRICE);
    this.lottoManager.generateNewLottos(newLottoCount);
    console.log("Validation Pass!");
  }
}