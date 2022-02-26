import { selectDom } from '../utils/utils';
import { SELECTOR } from '../constants/constants';

import LottoManager from '../model/lottoManager';
import LottoView from '../view/lottoView';

class LottoController {
  constructor() {
    this.view = new LottoView();
    this.lottoManager = new LottoManager();
  }

  startLotto() {
    this.cashInputSection = selectDom(SELECTOR.CASH_INPUT_SECTION_CLASS);
    this.cashInputSection.addEventListener('click', this.#onCashInputSectionClick);
  }

  #onCashInputSectionClick = ({ target }) => {
    if (target.className === SELECTOR.CASH_INPUT_BUTTON_CLASSNAME) {
      this.#processCashInput();
    }
  };

  #processCashInput = () => {
    const cashInput = selectDom(SELECTOR.CASH_INPUT_CLASS, this.cashInputSection);
    try {
      this.lottoManager.buyLotto(cashInput.value);
      this.view.disableCashInput();
      this.view.renderLottos(this.lottoManager.lottos);
      this.#initToggleButtonHandler();
    } catch (error) {
      alert(error.message);
    }
  };

  #initToggleButtonHandler() {
    this.showNumberToggleButton = selectDom(SELECTOR.SHOW_NUMBER_TOGGLE_BUTTON_CLASS);
    this.showNumberToggleButton.addEventListener('click', this.#onShowNumberToggleButtonClick);
  }

  #onShowNumberToggleButtonClick = ({ target }) => {
    this.view.toggleLottoNumbersShow(target.checked);
  };
}

export default LottoController;
