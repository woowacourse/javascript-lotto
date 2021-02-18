import { $ } from '../utils/querySelector.js';
import { showElement } from '../utils/setProperty.js';

export const renderWinningNumberInputForm = () => {
  const $winningNumberInputForm = $('#winning-number-input-form');

  showElement($winningNumberInputForm);
};
