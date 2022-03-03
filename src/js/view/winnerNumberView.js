import { CLASSNAMES, SELECTOR } from '../constants/constants';
import { selectDom } from '../utils/utils';

class WinnerNumberView {
  constructor() {
    this.winnerNumberSection = selectDom(SELECTOR.WINNER_NUMBER_SECTION_CLASS);
    this.winnerNumberInputs = this.winnerNumberSection.querySelectorAll('.winner-number-input');
    this.bonusNumberInput = selectDom('.bonus-number-input', this.winnerNumberSection);
    this.resultButton = selectDom('.result-button', this.winnerNumberSection);

    this.sendRequest = () => {};
  }

  addRequestHandler(sendRequest) {
    this.sendRequest = sendRequest;
  }

  render() {
    this.winnerNumberSection.classList.remove(CLASSNAMES.HIDE_CLASSNAME);
  }

  resetView() {
    this.winnerNumberSection.classList.add(CLASSNAMES.HIDE_CLASSNAME);
    this.winnerNumberInputs.forEach((input) => {
      input.value = '';
    });
    this.bonusNumberInput.value = '';
  }

  handleWinnerNumberInput = () => {
    const winnerNumbers = [...this.winnerNumberInputs].map(({ value }) => value);
    const bonusNumber = this.bonusNumberInput.value;

    const winnerNumberData = { numbers: [...winnerNumbers], bonus: bonusNumber };

    const matchResult = this.sendRequest('INPUT_WINNER_NUMBER', winnerNumberData);

    return matchResult;
  };
}

export default WinnerNumberView;
