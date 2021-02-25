import { EXCEED_RANGE_NUMBER } from '../lib/constants/alertMessage.js';
import {
  TICKET_MAX_NUMBER,
  TICKET_MIN_NUMBER,
} from '../lib/constants/lotto.js';

const isValidRange = number => {
  return number >= TICKET_MIN_NUMBER && number <= TICKET_MAX_NUMBER;
};

const winningNumberInputHandler = ({ target }) => {
  console.log(target);
  console.log(target.value);

  if (target.value.length && !isValidRange(Number(target.value))) {
    alert(EXCEED_RANGE_NUMBER);
    target.value = '';
  }
};

export default winningNumberInputHandler;
