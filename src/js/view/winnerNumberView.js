import { CLASSNAMES, SELECTOR } from '../constants/constants';
import { selectDom } from '../utils/utils';

class WinnerNumberView {
  constructor() {
    this.winnerNumberSection = selectDom(SELECTOR.WINNER_NUMBER_SECTION_CLASS);
    this.winnerNumberInputs = this.winnerNumberSection.querySelectorAll('.winner-number-input');
    this.bonusNumberInput = selectDom('.bonus-number-input', this.winnerNumberSection);
    this.resultButton = selectDom('.result-button', this.winnerNumberSection);
    this.resultButton.addEventListener('click', this.handleWinnerNumberInput);

    this.deliverMessage = () => {};
  }

  assignMessenger(deliverMessage) {
    this.deliverMessage = deliverMessage;
  }

  render() {
    this.winnerNumberSection.classList.remove(CLASSNAMES.HIDE_CLASSNAME);
  }

  handleWinnerNumberInput = () => {
    const winnerNumbers = [...this.winnerNumberInputs].map(({ value }) => value);
    const bonusNumber = this.bonusNumberInput.value;

    const winnerNumberData = { numbers: [...winnerNumbers], bonus: bonusNumber };

    this.deliverMessage({
      message: 'WINNER_NUMBER_INPUT',
      to: 'winnerMachine',
      params: winnerNumberData,
    });
  };
}

export default WinnerNumberView;
