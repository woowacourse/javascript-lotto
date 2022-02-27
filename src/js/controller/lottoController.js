import { selectDom } from '../utils/utils';
import { CLASSNAMES, SELECTOR } from '../constants/constants';

import LottoManager from '../model/lottoManager';
import LottoView from '../view/lottoView';

class LottoController {
  constructor() {
    this.view = new LottoView();
    this.view.attachCashInputEventListeners(this.#onCashInputSectionClick);
    this.lottoManager = new LottoManager();
  }

  #onCashInputSectionClick = ({ target }) => {
    if (target.className === CLASSNAMES.CASH_INPUT_BUTTON_CLASSNAME) {
      this.#processCashInput();
    }
  };

  #processCashInput = () => {
    const cashInput = selectDom(SELECTOR.CASH_INPUT_CLASS);
    try {
      this.lottoManager.buyLotto(cashInput.value);
      const lottos = this.lottoManager.getLottos();

      this.view.disableCashInput();
      this.view.renderLottos(lottos);
    } catch (error) {
      alert(error.message);
    }
  };
}

export default LottoController;
