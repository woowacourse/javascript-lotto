import { $ } from '../utils/dom';
import { ERROR_MESSAGE } from './constants';
import { isValidMoneyInput } from './validator';

export default class LottoController {
  constructor() {
    const purchaseForm = $('.purchase-form');
    purchaseForm.addEventListener('submit', this.purchaseHandler);
  }

  purchaseHandler = e => {
    e.preventDefault();
    const moneyInput = Number($('.money-input').value);

    if (!isValidMoneyInput(moneyInput)) {
      alert(ERROR_MESSAGE.INVALID_MONEY_INPUT);
      return;
    }
  }
}
