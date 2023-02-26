import { ClassName, QuerySelector } from '../constants/Dom';
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

  activate(setWinningLotto) {
    $(QuerySelector.RESULT_BUTTON).addEventListener('click', (e) => {
      e.preventDefault();
      const winningNumbers = this.#getWinningNumbers();
      const bonusNumber = this.#getBonusNumber();

      setWinningLotto(winningNumbers, bonusNumber);
    });
  }

  #getWinningNumbers() {
    return [...this.winningNumberInputs].map((input) => Number(input.value));
  }

  #getBonusNumber() {
    return Number(this.bonusNumberInput.value);
  }

  reset() {
    this.lottoInputField.classList.remove(ClassName.SHOW);
    this.resetWinningNumberInputs();
    this.resetBonusNumberInput();
  }

  resetWinningNumberInputs() {
    this.winningNumberInputs.forEach((input) => {
      input.value = '';
    });
    this.winningNumberInputs[0].focus();
  }

  resetBonusNumberInput() {
    this.bonusNumberInput.value = '';
  }
}

export default new LottoInput();
