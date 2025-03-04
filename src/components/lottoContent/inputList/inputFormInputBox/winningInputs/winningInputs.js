import createDomElement from '../../../../../utils/createDomElement.js';
import { validateAllInputs } from '../inputFormInputBox.js';

const winningNumberOption = {
  className: 'winning_number',
  name: 'winningNumber',
  type: 'number',
  min: 1,
  max: 45,
  required: true,
};

const $winningInputs = (winningNumbersCount) => {
  const winningNumberInputs = createDomElement('div', {
    className: 'lotto_numbers',
  });

  Array.from({ length: winningNumbersCount }, () => {
    const winningInput = createDomElement('input', winningNumberOption);
    winningInput.addEventListener('input', validateAllInputs);
    return winningNumberInputs.appendChild(winningInput);
  });

  return winningNumberInputs;
};

export default $winningInputs;
