import LottoGenerator from '../model/lottoGenerator';
import LottoMachineView from '../view/lottoMachineView';

class LottoMachine {
  constructor() {
    this.view = new LottoMachineView();
    this.lottoGenerator = new LottoGenerator();
  }

  startLotto() {
    this.view.cashInputButton.addEventListener('click', this.#onCashInputButtonClick);
  }

  #onCashInputButtonClick = (e) => {
    e.preventDefault();
    try {
      this.lottoGenerator.buyLotto(this.view.cashInput.value);
      this.view.disableCashInputSection();
      this.view.renderLottos(this.lottoGenerator.lottos);
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

export default new LottoMachine();
