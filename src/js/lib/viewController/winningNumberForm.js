import { $ } from '../utils/dom.js';

const focusFirstWinningNumberInput = () => {
  $('.winning-number[name=first]').focus();
};

export { focusFirstWinningNumberInput };
