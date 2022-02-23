import { LOTTO_PRICE } from './constants';
import { $, divider } from './util';
import { validateCharge } from './validation';

export default class LottoMachine {
  constructor() {
    this.setEvent();
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
    const newLottoCount = divider(chargeInputNumber, LOTTO_PRICE);
    console.log("Validation Pass!");
  }
}