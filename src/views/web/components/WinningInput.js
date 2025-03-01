import { createTag } from '../utils/dom.js';

const WinningInput = {
  appendWinningInput: ($target) => {
    const numbersArray = Array.from({ length: 6 }, (_, idx) => idx + 1);
    const $winningInputContainer = createTag('div');
    $winningInputContainer.classList.add('winningNumbersContainer');
    numbersArray.forEach((number) => {
      const $input = createTag('input');
      $input.min = 1;
      $input.max = 45;
      $input.id = `winningNumber_${number}`;
      $input.required = true;
      $winningInputContainer.appendChild($input);
    });
    $target.appendChild($winningInputContainer);
  },
};

export default WinningInput;
