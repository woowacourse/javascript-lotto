// import { validator } from '../domain/validation/validator';
import { CONSOLE_MESSAGE } from '../js/constants/constants';

export default class PurchasePriceView {
  constructor() {
    this.form = document.getElementById('price-form');
    this.input = document.getElementById('price-input');
  }

  addSubmitEvent(submitHandler) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const purchasePriceInput = this.input.value;

      try {
        // validator.purchasePrice(purchasePriceInput);
        submitHandler(purchasePriceInput);
      } catch (error) {
        this.resetInputValue();
        console.log(error);
      }
    });
  }

  printLottoCount(lottoCount) {
    const msg = CONSOLE_MESSAGE.showLottoCount(lottoCount);
    const msgDiv = document.getElementById('price-result');
    msgDiv.innerHTML = `<span>${msg}</span>`;
  }

  resetInputValue() {
    this.input.value = '';
  }
}
