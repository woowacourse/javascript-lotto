import { $ } from './util';
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
    const number = Number($("#charge-input").value);
    try {
      validateCharge(number);
    } catch (error) {
      alert(error.message);
      return;
    }
    console.log("Validation Pass!");
  }
}