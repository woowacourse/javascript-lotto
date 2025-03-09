import { $, $all } from '../../util/web/selector.js';

export const getPriceInput = () => $('#price').value.trim();

export const getWinningNumbers = () => {
  const winningNumberInput = $all('.winning-form__number-box').map((input) => input.value.trim());

  const bonusNumberInput = $('#bonus').value.trim();

  return { winningNumberInput, bonusNumberInput };
};

export const resetForm = () => {
  $('#purchase-form').reset();
  $('#winning-number-form').reset();
};
