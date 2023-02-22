import { $, $$ } from '../../util/web/querySelector.js';

const InputCleaner = {
  inputs: [$('#budgetInput'), ...$$('.winning-number-input'), $('.bonus-number-input')],

  clearAllInputs() {
    this.inputs.forEach((currentInput) => {
      currentInput.value = '';
    });
  },
};

export default InputCleaner;
