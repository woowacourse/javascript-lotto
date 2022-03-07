import LottoRoundModel from './models/LottoRound';
import { SELECTOR } from './constants/selector';
import LottoRoundView from './views';
import { findElement } from './utils/elementSelector';
import { isNotValidNumber } from './utils/validator';

class LottoRoundManager {
  lottoRoundModel = new LottoRoundModel();
  lottoRoundView = new LottoRoundView();
  $chargeForm = findElement(SELECTOR.CHARGE_INPUT_FORM);
  $chargeInput = findElement(SELECTOR.CHARGE_INPUT);
  $alignConverter = findElement(SELECTOR.ALIGN_CONVERTER);
  $winNumberForm = findElement(SELECTOR.WIN_NUMBER_INPUT_FORM);
  $modalCloseButton = findElement(SELECTOR.MODAL_CLOSE_BUTTON);
  $replayButton = findElement(SELECTOR.REPLAY_BUTTON);

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
      this.lottoRoundModel.createLottoList(chargeInput);

      const lottoList = this.lottoRoundModel.getLottoList();
      this.lottoRoundView.renderLottoSection(lottoList);
      this.lottoRoundView.renderWinNumberInputSection(true);
    } catch (message) {
      alert(message);
    }
  };

  onChangeAlignState = (e) => {
    const { checked: alignState } = e.target;
    this.lottoRoundView.renderAlignState(alignState, this.lottoRoundModel.getLottoList().length);
  };

  onInputWinNumberForm = (e) => {
    const targetElement = e.target;
    if (isNotValidNumber(Number(targetElement.value))) {
      this.lottoRoundView.setInvalidInputState(targetElement);
      e.target.value = '';
      return;
    }
    this.lottoRoundView.setValidInputState(targetElement);
    if (targetElement.value.length !== 2) {
      return;
    }
    if (targetElement.nextElementSibling !== null) {
      targetElement.nextElementSibling.focus();
      return;
    }
    if (targetElement === findElement(SELECTOR.WIN_NUMBER_INPUT_6)) {
      findElement(SELECTOR.BONUS_NUMBER_INPUT).focus();
    }
  };

  onSubmitWinNumberInputForm = (e) => {
    e.preventDefault();
    try {
      const inputWinNumber = this.getInputWinNumber();
      const roundResult = this.lottoRoundModel.getRoundResult(inputWinNumber);
      this.lottoRoundView.openResultModal(roundResult);
    } catch (message) {
      alert(message);
    }
  };

  getInputWinNumber() {
    return [
      Number(findElement(SELECTOR.WIN_NUMBER_INPUT_1).value),
      Number(findElement(SELECTOR.WIN_NUMBER_INPUT_2).value),
      Number(findElement(SELECTOR.WIN_NUMBER_INPUT_3).value),
      Number(findElement(SELECTOR.WIN_NUMBER_INPUT_4).value),
      Number(findElement(SELECTOR.WIN_NUMBER_INPUT_5).value),
      Number(findElement(SELECTOR.WIN_NUMBER_INPUT_6).value),
      Number(findElement(SELECTOR.BONUS_NUMBER_INPUT).value),
    ];
  }

  onClickReplayButton = () => {
    this.lottoRoundModel.initialize();
    this.lottoRoundView.initialize();
    this.$chargeForm.reset();
    this.$winNumberForm.reset();
    this.lottoRoundView.closeResultModal();
  };

  onClickCloseModalButton = () => {
    this.lottoRoundView.closeResultModal();
  };
}
export default LottoRoundManager;
