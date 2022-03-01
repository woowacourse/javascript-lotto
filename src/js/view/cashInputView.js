import { SELECTOR } from '../constants/constants';
import { selectDom } from '../utils/utils';

class CashInputView {
  constructor() {
    this.deliverMessage = null;
    this.cashInputSection = selectDom(SELECTOR.CASH_INPUT_SECTION_CLASS);
    this.cashInputButton = selectDom(SELECTOR.CASH_INPUT_BUTTON_CLASS, this.cashInputSection);
    this.cashInputButton.addEventListener('click', this.#onCashInputButtonClick);
  }

  assignMessenger(deliverMessage) {
    this.deliverMessage = deliverMessage;
  }

  #onCashInputButtonClick = () => {
    const { value: cashInput } = selectDom(SELECTOR.CASH_INPUT_CLASS, this.cashInputSection);
    this.deliverMessage({ message: 'INPUT_CASH', to: 'machine', params: cashInput });
  };
}

export default CashInputView;
