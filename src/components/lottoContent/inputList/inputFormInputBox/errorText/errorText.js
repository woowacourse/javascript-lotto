import createDomElement from '../../../../../utils/createDomElement.js';

const $winningNumbersError = () => {
  const winningNumbersError = createDomElement('span', {
    className: 'lotto_winning_numbers_error',
    id: 'lottoWinningNumbersError',
  });

  return winningNumbersError;
};

export default $winningNumbersError;
