import { Event, QuerySelector } from '../constants/HTML';
import { $, $$ } from '../utils/DomUtils';

class LottoInput {
  constructor() {
    this.lottoInput = $(QuerySelector.LOTTO_INPUT_FIELD);
  }

  render() {
    this.lottoInput.classList.add('show');
  }

  activate = (setWinningLotto) => {
    $(QuerySelector.RESULT_BUTTON).addEventListener(Event.CLICK, () => {
      const winningNumbers = this.#getWinningNumbers();
      const bonusNumber = this.#getBonusNumber();

      setWinningLotto(winningNumbers, bonusNumber);
    });
  };

  #getWinningNumbers = () => {
    const winningNumberInputs = $$(QuerySelector.WINNING_NUMBER);
    const winningNumbers = [];

    winningNumberInputs.forEach((input) => {
      winningNumbers.push(Number(input.value));
    });

    return winningNumbers;
  };

  #getBonusNumber = () => {
    const bonusNumber = $(QuerySelector.BONUS_NUMBER);

    return Number(bonusNumber.value);
  };
}

export default LottoInput;
