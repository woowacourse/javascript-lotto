import { SELECTOR } from '../constants/constants';
import { selectDom } from '../utils/utils';

class WinnerNumberInputView {
  constructor() {
    this.winnerNumberSection = selectDom(SELECTOR.WINNER_NUMBER_SECTION_CLASS);
    this.winnerNumberInputs = this.winnerNumberSection.querySelectorAll(
      SELECTOR.WINNER_NUMBER_INPUT_CLASS
    );
    this.bonusNumberInput = selectDom(SELECTOR.BONUS_NUMBER_INPUT_CLASS, this.winnerNumberSection);
    this.resultButton = selectDom(SELECTOR.RESULT_BUTTON_CLASS, this.winnerNumberSection);

    this.sendRequest = () => {};
  }

  addRequestHandler(sendRequest) {
    this.sendRequest = sendRequest;
  }

  render() {
    this.winnerNumberSection.classList.remove('hide');
  }

  handleWinnerNumberInput = () => {
    const winnerNumbers = [...this.winnerNumberInputs].map(({ value }) => value);
    const bonusNumber = this.bonusNumberInput.value;

    const winnerNumberData = { numbers: [...winnerNumbers], bonus: bonusNumber };

    const matchResult = this.sendRequest('INPUT_WINNER_NUMBER', winnerNumberData);

    return matchResult;
  };

  resetView() {
    this.winnerNumberSection.classList.add('hide');
    this.winnerNumberInputs.forEach((input) => {
      input.value = '';
    });
    this.bonusNumberInput.value = '';
  }
}

export default WinnerNumberInputView;
