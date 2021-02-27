import {
  MSG_BLANK_INPUT,
  MSG_OUT_RANGED_LOTTO_NUMBERS,
  MSG_OVERLAPPED_LOTTO_NUMBERS,
} from '../constants/alertMessage.js';
import {
  WINNING_NUMBER_COUNT,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
  MSG_INVALID_PURCHASE_AMOUNT,
  UNIT_AMOUNT,
} from '../constants/index.js';

const isRangeOf = (min, max, numbers) => numbers.every(number => min <= number && number <= max);

const isOverlapped = numbers => numbers.length !== new Set(numbers).size;

export const validator = {
  purchaseAmount: money => {
    if (!(money / UNIT_AMOUNT > 0 && money % UNIT_AMOUNT === 0)) {
      return MSG_INVALID_PURCHASE_AMOUNT;
    }

    return '';
  },
  lottoNumbers: numbers => {
    if (numbers.length < WINNING_NUMBER_COUNT) {
      return MSG_BLANK_INPUT;
    }
    if (!isRangeOf(MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER, numbers)) {
      return MSG_OUT_RANGED_LOTTO_NUMBERS;
    }
    if (isOverlapped(numbers)) {
      return MSG_OVERLAPPED_LOTTO_NUMBERS;
    }

    return '';
  },
};
