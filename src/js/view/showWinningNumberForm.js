import { $ } from '../../util/selector.js';

const showWinningNumberForm = (isValid) => {
  const winningNumberForm = $('.winning-form');
  winningNumberForm.style.display = isValid ? 'block' : 'none';
};

export default showWinningNumberForm;
