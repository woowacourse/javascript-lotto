import { ClassName, Event, QuerySelector } from '../constants/HTML';
import { $, $$ } from '../utils/DomUtils';

class LottoInput {
  constructor() {
    this.lottoInputField = $(QuerySelector.LOTTO_INPUT_FIELD);
    this.winningNumberInputs = $$(QuerySelector.WINNING_NUMBER);
    this.bonusNumberInput = $(QuerySelector.BONUS_NUMBER);
  }

  render() {
    this.lottoInputField.classList.add(ClassName.SHOW);
  }

  activate = (setWinningLotto) => {
    $(QuerySelector.RESULT_BUTTON).addEventListener(Event.CLICK, () => {
      const winningNumbers = this.#getWinningNumbers();
      const bonusNumber = this.#getBonusNumber();

      setWinningLotto(winningNumbers, bonusNumber);
    });
  };

  #getWinningNumbers = () => {
    const winningNumbers = [];

    this.winningNumberInputs.forEach((input) => {
      winningNumbers.push(Number(input.value));
    });

    return winningNumbers;
  };

  #getBonusNumber = () => {
    return Number(this.bonusNumberInput.value);
  };

  reset() {
    this.lottoInputField.classList.remove(ClassName.SHOW);

    this.winningNumberInputs.forEach((each) => {
      each.value = '';
    });
    this.bonusNumberInput.value = '';
  }
}

export default LottoInput;
