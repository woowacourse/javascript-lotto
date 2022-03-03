import { SELECTOR } from '../constants/constants';
import { selectDom } from '../utils/utils';

class CashInputView {
  constructor() {
    this.sendRequest = () => {};
    this.cashInputSection = selectDom(SELECTOR.CASH_INPUT_SECTION_CLASS);
    this.cashInput = selectDom(SELECTOR.CASH_INPUT_CLASS, this.cashInputSection);
    this.cashInputButton = selectDom(SELECTOR.CASH_INPUT_BUTTON_CLASS, this.cashInputSection);
  }

  addRequestHandler(sendRequest) {
    this.sendRequest = sendRequest;
  }

  handleCashInput = () => {
    const { value: cashInput } = this.cashInput;
    const lottoArray = this.sendRequest('INPUT_CASH', cashInput);
    return lottoArray;
  };

  disableCashInput() {
    this.cashInput.disabled = true;
    this.cashInputButton.disabled = true;
    this.cashInputButton.textContent = '구입완료';
  }

  resetView() {
    this.cashInput.value = '';
    this.cashInput.disabled = false;
    this.cashInputButton.disabled = false;
    this.cashInputButton.textContent = '구입하기';
  }
}

export default CashInputView;
