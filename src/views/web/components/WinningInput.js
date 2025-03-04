import { LOTTO } from '../../../constants/CONFIGURATIONS.js';
import { createTag } from '../utils/dom.js';

const WinningInput = {
  appendWinningInput: ($target) => {
    const numbersArray = Array.from({ length: LOTTO.NUMBER_LENGTH }, (_, idx) => idx + 1);
    const $winningInputContainer = createTag('div');
    $winningInputContainer.classList.add('winningNumbersContainer');
    numbersArray.forEach((number) => {
      const $input = createTag('input');
      $input.min = LOTTO.MIN_NUMBER;
      $input.max = LOTTO.MAX_NUMBER;
      $input.id = `winningNumber_${number}`;
      $input.required = true;
      $winningInputContainer.appendChild($input);
    });
    $target.appendChild($winningInputContainer);
  },
};

export default WinningInput;
