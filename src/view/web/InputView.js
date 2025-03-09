import { $, $all } from '../../util/web/selector.js';

export const getPriceInput = () => $('#price').value.trim();

export const getWinningNumbers = () => {
  const winningNumbers = $all('.winning-form__number-box').map((input) => input.value.trim());

  const bonusNumber = $('#bonus').value.trim();

  return { winningNumbers, bonusNumber };
};

export const resetForm = () => {
  $('#purchase-form').reset();
  $('#winning-number-form').reset();
};
