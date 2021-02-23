import { EXCEED_RANGE_NUMBER } from '../lib/constants/alertMessage.js';

const winningNumberInputHandler = ({ target }) => {
  if (
    !target.classList.contains('winning-number') &&
    !target.classList.contains('bonus-number')
  )
    return;

  if (Number(target.value) > 45 || Number(target.value) < 1) {
    alert(EXCEED_RANGE_NUMBER);
    target.value = '';
  }
};

export default winningNumberInputHandler;
