import { LOTTO } from '../../../constants/CONFIGURATIONS.js';
import { createTag } from '../utils/dom.js';

const BonusInput = {
  appendBonusInput: ($target) => {
    const $input = createTag('input');
    $input.min = LOTTO.MIN_NUMBER;
    $input.max = LOTTO.MAX_NUMBER;
    $input.id = 'bonusNumber';
    $input.required = true;
    $target.appendChild($input);
  },
};

export default BonusInput;
