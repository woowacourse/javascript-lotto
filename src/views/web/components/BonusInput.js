import { createTag } from '../utils/dom.js';

const BonusInput = {
  appendBonusInput: ($target) => {
    const $input = createTag('input');
    $input.min = 1;
    $input.max = 45;
    $input.id = 'bonusNumber';
    $input.required = true;
    $target.appendChild($input);
  },
};

export default BonusInput;
