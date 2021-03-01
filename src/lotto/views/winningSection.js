import {
  $$correctNumberInputs,
  $correctNumberInputForm,
} from '../../elements.js';

const winningSection = {
  correctNumberInputsInit() {
    $$correctNumberInputs.forEach(
      ($correctNumber) => ($correctNumber.value = ''),
    );
  },

  displayCorrectNumberInputForm() {
    $correctNumberInputForm.classList.remove('hide');
  },

  hideCorrectNumberInputForm() {
    $correctNumberInputForm.classList.add('hide');
  },
};

export default winningSection;
