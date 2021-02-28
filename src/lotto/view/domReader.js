import { $correctNumberWrapper } from '../../elements.js';
import { $ } from '../../utils/querySelector.js';

export const getCorrectNumbers = () => {
  const winningNumbers = $('.winning-number', $correctNumberWrapper)
    .filter(({ value }) => value !== '')
    .map(({ value }) => Number(value));
  const bonusNumberInput = $('.bonus-number', $correctNumberWrapper).value;
  const correctNumbers =
    bonusNumberInput === ''
      ? [...winningNumbers]
      : [...winningNumbers, Number(bonusNumberInput)];

  return correctNumbers;
};
