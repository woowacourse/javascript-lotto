import { ClassName, Event, QuerySelector } from '../constants/HTML';
import { $, $$ } from '../utils/DomUtils';

class LottoInput {
  constructor() {
    this.lottoInput = $(QuerySelector.LOTTO_INPUT_FIELD);
  }

  render() {
    this.lottoInput.classList.add(ClassName.SHOW);
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

  reset() {
    this.lottoInput.classList.remove(ClassName.SHOW);

    $$(QuerySelector.WINNING_NUMBER).forEach((each) => {
      each.value = '';
    });
    $(QuerySelector.BONUS_NUMBER).value = '';
  }
}

export default LottoInput;
