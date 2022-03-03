import LottoGameModel from './models/LottoGame';
import { SELECTOR } from './constants/selector';
import LottoGameView from './views';
import { findElement } from './utils/elementSelector';

class LottoGameManager {
  init() {
    this.lottoGameModel = new LottoGameModel();
    this.lottoGameView = new LottoGameView();
    this.$chargeForm = findElement(SELECTOR.CHARGE_INPUT_FORM);
    this.$chargeInput = findElement(SELECTOR.CHARGE_INPUT);
    this.$alignConverter = findElement(SELECTOR.ALIGN_CONVERTER);
    this.$winNumberForm = findElement(SELECTOR.WIN_NUMBER_INPUT_FORM);
    this.$modalCloseButton = findElement(SELECTOR.MODAL_CLOSE_BUTTON);
    this.$replayButton = findElement(SELECTOR.REPLAY_BUTTON);
    this.$chargeForm.addEventListener('submit', this.onSubmitChargeInputForm);
    this.$alignConverter.addEventListener('change', this.onChangeAlignState);
    this.$winNumberForm.addEventListener('submit', this.onSubmitWinNumberInputForm);
    this.$replayButton.addEventListener('click', this.onClickReplayButton);
    this.$modalCloseButton.addEventListener('click', this.onClickCloseModalButton);
  }

  onSubmitChargeInputForm = (e) => {
    e.preventDefault();
    try {
      const { value: chargeInputStr } = this.$chargeInput;
      const chargeInput = Number(chargeInputStr);
      this.lottoGameModel.createLottoList(chargeInput);

      const lottoList = this.lottoGameModel.getLottoList();
      this.lottoGameView.renderLottoSection(lottoList);
      this.lottoGameView.renderWinNumberInputSection(true);
    } catch (message) {
      alert(message);
    }
  };

  onChangeAlignState = (e) => {
    const { checked: alignState } = e.target;
    this.lottoGameView.renderAlignState(alignState);
  };

  onSubmitWinNumberInputForm = (e) => {
    e.preventDefault();
    try {
      const inputWinNumber = this.getInputWinNumber(e);
      const gameResult = this.lottoGameModel.getGameResult(inputWinNumber);
      this.lottoGameView.openResultModal(gameResult);
    } catch (message) {
      alert(message);
    }
  };

  getInputWinNumber(e) {
    return [
      Number(e.path[0][0].value),
      Number(e.path[0][1].value),
      Number(e.path[0][2].value),
      Number(e.path[0][3].value),
      Number(e.path[0][4].value),
      Number(e.path[0][5].value),
      Number(e.path[0][6].value),
    ];
  }

  onClickReplayButton = () => {
    this.lottoGameModel.initialize();
    this.lottoGameView.initialize();
    this.$chargeForm.reset();
    this.$winNumberForm.reset();
    this.lottoGameView.closeResultModal();
  };

  onClickCloseModalButton = () => {
    this.lottoGameView.closeResultModal();
  };
}
export default LottoGameManager;
