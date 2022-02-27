import LottoManager from '../model/lottoManager';
import LottoView from '../view/lottoView';

class LottoController {
  constructor() {
    this.view = new LottoView();
    this.lottoManager = new LottoManager();
  }

  startLotto() {
    this.view.cashInputButton.addEventListener('click', this.#onCashInputButtonClick);
  }

  #onCashInputButtonClick = (e) => {
    e.preventDefault();
    try {
      this.lottoManager.buyLotto(this.view.cashInput.value);
      this.view.disableCashInputSection();
      this.view.renderLottos(this.lottoManager.lottos);
      this.view.showNumberToggleButton.addEventListener(
        'click',
        this.#onShowNumberToggleButtonClick
      );
    } catch (error) {
      alert(error.message);
    }
  };

  #onShowNumberToggleButtonClick = ({ target }) => {
    this.view.toggleLottoNumbersShow(target.checked);
  };
}

export default new LottoController();
