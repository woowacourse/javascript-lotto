import { $correctNumberInputWrapper } from '../../elements.js';
import { SELECTOR } from '../../constants.js';
import { $ } from '../../utils/querySelector.js';

export const getCorrectNumbers = () => {
  const winningNumbers = $(SELECTOR.CORRECT_NUMBER_INPUT, $correctNumberInputWrapper)
    .filter(({ value }) => value !== '')
    .map(({ value }) => Number(value));
  const bonusNumberInput = $(SELECTOR.CORRECT_NUMBER_INPUT_BONUS, $correctNumberInputWrapper).value;
  const correctNumbers =
    bonusNumberInput === ''
      ? [...winningNumbers]
      : [...winningNumbers, Number(bonusNumberInput)];

  return correctNumbers;
};
