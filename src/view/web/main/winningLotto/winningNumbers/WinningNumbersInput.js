import { LOTTO_RULES } from '../../../../../constant/constants.js';

export default function WinningNumbersInput(idNumber) {
  const numberInput = document.createElement('input');

  numberInput.setAttribute('id', `winning-number-${idNumber}`);
  numberInput.setAttribute('type', 'number');
  numberInput.setAttribute('required', 'required');
  numberInput.setAttribute('min', LOTTO_RULES.min_number);
  numberInput.setAttribute('max', LOTTO_RULES.max_number);
  numberInput.classList.add('number-input');
  numberInput.classList.add('lotto-number');

  return numberInput;
}
