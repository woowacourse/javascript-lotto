import {
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  LOTTO_NUMBER_CHECK_MESSAGE,
  LOTTO_NUMBERS_LENGTH,
  BONUS_NUMBER_LENGTH,
} from '../constants.js';
import { enable, disable } from '../utils/DOM.js';

export const getLottoNumberCheckMessage = ({ type, numbers }) => {
  if (numbers.some(isOutOfRange)) {
    return LOTTO_NUMBER_CHECK_MESSAGE.OUT_OF_RANGE;
  }

  if (isDuplicated(numbers)) {
    return LOTTO_NUMBER_CHECK_MESSAGE.DUPLICATED;
  }

  if (hasBlank({ type, numbers })) {
    return LOTTO_NUMBER_CHECK_MESSAGE.HAS_BLANK;
  }

  return LOTTO_NUMBER_CHECK_MESSAGE.COMPLETED;
};

const isOutOfRange = (number) => {
  return number < LOTTO_MIN_NUMBER || number > LOTTO_MAX_NUMBER;
};

const isDuplicated = (numbers) => {
  return new Set(numbers).size !== numbers.length;
};

const totalNumbersLength = {
  lottoNumbers: LOTTO_NUMBERS_LENGTH,
  winningNumbers: LOTTO_NUMBERS_LENGTH + BONUS_NUMBER_LENGTH,
};

const hasBlank = ({ type, numbers }) => {
  return numbers.length !== totalNumbersLength[type];
};

export const renderCheckMessage = ({ $target, checkMessage, $resultButton }) => {
  $target.innerText = checkMessage;

  if (checkMessage !== LOTTO_NUMBER_CHECK_MESSAGE.COMPLETED) {
    $target.classList.replace('text-green', 'text-red');
    disable($resultButton);
    return;
  }

  $target.classList.replace('text-red', 'text-green');
  enable($resultButton);
};
