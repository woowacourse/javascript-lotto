import PurchaseAmountValidator from '../../validators/PurchaseAmountValidator';
import { $ } from './utils/dom';

class App {
  start() {
    this.submitAmountInputForm();
  }

  submitAmountInputForm() {
    $('.purchase-form').addEventListener('submit', (event) => {
      this.handleAmountInputForm(event);
    });
  }

  handleAmountInputForm(event) {
    event.preventDefault();

    try {
      PurchaseAmountValidator.validate(Number($('.purchase-amount').value));
    } catch (error) {
      alert(error.message);
    }
  }
}

export default App;
