import { DISABLED_PURCHASE_BUTTON_TEXT, SELECTOR } from '../constants/constants';
import { selectDom } from '../utils/utils';

class CashInputView {
  constructor() {
    this.deliverMessage = () => {};
    this.cashInputSection = selectDom(SELECTOR.CASH_INPUT_SECTION_CLASS);
    this.cashInput = selectDom(SELECTOR.CASH_INPUT_CLASS, this.cashInputSection);
    this.cashInputButton = selectDom(SELECTOR.CASH_INPUT_BUTTON_CLASS, this.cashInputSection);
    this.cashInputButton.addEventListener('click', this.#onCashInputButtonClick);
  }

  assignMessenger(deliverMessage) {
    this.deliverMessage = deliverMessage;
  }

  disableCashInput() {
    this.cashInput.disabled = true;
    this.cashInputButton.disabled = true;
    this.cashInputButton.textContent = DISABLED_PURCHASE_BUTTON_TEXT;
  }

  resetView() {
    this.cashInput.value = '';
    this.cashInput.disabled = false;
    this.cashInputButton.disabled = false;
    this.cashInputButton.textContent = '구입하기';
  }

  #onCashInputButtonClick = () => {
    const { value: cashInput } = this.cashInput;
    this.deliverMessage({ message: 'INPUT_CASH', to: 'purchaseMachine', params: cashInput });
  };
}

export default CashInputView;
