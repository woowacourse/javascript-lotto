import LottoGameModel from './models/LottoGame';
import { SELECTOR } from './constants/selector';
import LottoGameView from './views';
import { findElement } from './utils/elementSelector';
import { isNotValidNumber } from './utils/validator';

class LottoGameManager {
  lottoGameModel = new LottoGameModel();
  lottoGameView = new LottoGameView();
  $chargeForm = findElement(SELECTOR.CHARGE_INPUT_FORM);
  $chargeInput = findElement(SELECTOR.CHARGE_INPUT);
  $alignConverter = findElement(SELECTOR.ALIGN_CONVERTER);
  $winNumberForm = findElement(SELECTOR.WIN_NUMBER_INPUT_FORM);
  $modalCloseButton = findElement(SELECTOR.MODAL_CLOSE_BUTTON);
  $replayButton = findElement(SELECTOR.REPLAY_BUTTON);
  $lastWinNumberInput = findElement(SELECTOR.LAST_WIN_NUMBER_INPUT);
  $bonusNumberInput = findElement(SELECTOR.BONUS_NUMBER_INPUT);

  init() {
    this.$chargeForm.addEventListener('submit', this.onSubmitChargeInputForm);
    this.$alignConverter.addEventListener('change', this.onChangeAlignState);
    this.$winNumberForm.addEventListener('submit', this.onSubmitWinNumberInputForm);
    this.$winNumberForm.addEventListener('input', this.onInputWinNumberForm);
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
    this.lottoGameView.renderAlignState(alignState, this.lottoGameModel.getLottoList().length);
  };

  onInputWinNumberForm = (e) => {
    if (isNotValidNumber(Number(e.target.value))) {
      this.lottoGameView.setInvalidInputState(e.target);
      e.target.value = '';
      return;
    }
    this.lottoGameView.setValidInputState(e.target);
    if (e.target.value.length === 2) {
      if (e.target.nextElementSibling !== null) {
        e.target.nextElementSibling.focus();
        return;
      }
      if (e.target === this.$lastWinNumberInput) {
        this.$bonusNumberInput.focus();
      }
    }
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
