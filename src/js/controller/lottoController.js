import { selectDom } from '../utils/utils';
import LottoManager from '../model/lottoManager';
import { SELECTOR } from '../constants/constants';

class LottoController {
  startLotto() {
    this.cashInputSection = selectDom(SELECTOR.CASH_INPUT_SECTION_CLASS);
    this.cashInputSection.addEventListener('click', this.#onCashInputButtonClick);
  }

  #onCashInputButtonClick(e) {
    e.preventDefault();
    const { target } = e;
    if (target.className === SELECTOR.CASH_INPUT_BUTTON_CLASSNAME) {
      const { value: cashInput } = selectDom(SELECTOR.CASH_INPUT_CLASS, this.cashInputSection);
      this.lottoManager = new LottoManager();
      this.lottoManager.buyLotto(cashInput);
    }
  }
}

export default LottoController;
