import { $ } from '../utils/dom.js';

const showWinningNumberForm = () => {
  $('#lotto-number-form').classList.remove('hide');
};

const focusFirstWinningNumberInput = () => {
  $('.winning-number[name=first]').focus();
};

export { focusFirstWinningNumberInput, showWinningNumberForm };
