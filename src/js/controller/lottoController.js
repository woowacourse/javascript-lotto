import { selectDom } from '../utils/utils';
import LottoManager from '../model/lottoManager';
import { SELECTOR } from '../constants/constants';
import LottoView from '../view/lottoView';

class LottoController {
  startLotto() {
    this.cashInputSection = selectDom(SELECTOR.CASH_INPUT_SECTION_CLASS);
    this.cashInputSection.addEventListener('click', this.#onCashInputButtonClick);
  }

  #onCashInputButtonClick = (e) => {
    e.preventDefault();
    const { target } = e;
    if (target.className === SELECTOR.CASH_INPUT_BUTTON_CLASSNAME) {
      const { value: cashInput } = selectDom(SELECTOR.CASH_INPUT_CLASS, this.cashInputSection);

      this.lottoManager = new LottoManager();
      try {
        this.lottoManager.buyLotto(cashInput);
        this.view = new LottoView();
        this.view.renderLottos(this.lottoManager.lottos);
        this.initToggleButtonHandler();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  initToggleButtonHandler() {
    this.showNumberToggleButton = selectDom(SELECTOR.SHOW_NUMBER_TOGGLE_BUTTON_CLASS);
    this.showNumberToggleButton.addEventListener('click', this.#onShowNumberToggleButtonClick);
  }

  #onShowNumberToggleButtonClick = ({ target }) => {
    this.view.toggleShowLottoNumbers(target.checked);
  };
}

export default LottoController;
