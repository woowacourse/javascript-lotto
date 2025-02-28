import createDomElement from '../../../../../utils/createDomElement.js';

const $winningInputs = (winningNumbersCount) => {
  const winningNumberInputs = createDomElement('div', {
    className: 'lotto_numbers',
  });
  Array.from({ length: winningNumbersCount }, () => {
    const winningInput = createDomElement('input', {
      className: 'winning_number',
      name: 'winningNumber',
      type: 'number',
      max_length: 2,
      required: true,
    });
    return winningNumberInputs.appendChild(winningInput);
  });

  return winningNumberInputs;
};

export default $winningInputs;
