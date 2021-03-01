import { $correctNumberInputForm } from '../../elements.js';

const winningSection = {
  displayCorrectNumberInputForm() {
    $correctNumberInputForm.classList.remove('hide');
  },

  hideCorrectNumberInputForm() {
    $correctNumberInputForm.classList.add('hide');
  },
};

export default winningSection;
