import { $ } from '../utils/querySelector.js';
import { showElement, hideElement } from '../utils/setProperty.js';

const $winningNumberInputForm = $('#winning-number-input-form');

export const showWinningNumberInputForm = () => {
  showElement($winningNumberInputForm);
};

export const hideWinningNumberInputForm = () => {
  hideElement($winningNumberInputForm);
};
