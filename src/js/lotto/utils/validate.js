import {
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
  MSG_BLANK_INPUT,
  MSG_INVALID_PAYMENT,
  MSG_OUT_RANGED_NUMBERS,
  MSG_OVERLAPPED_NUMBERS,
  MSG_SUFFIX,
  UNIT_AMOUNT,
} from './constants.js';

export const checkValidPayment = money => {
  if (!(money / UNIT_AMOUNT > 0 && money % UNIT_AMOUNT === 0)) {
    return MSG_INVALID_PAYMENT;
  }

  return '';
};

const isRangeOf = (min, max, numbers) => numbers.every(number => min <= number && number <= max);

const isOverlapped = numbers => numbers.length !== new Set(numbers).size;

export const checkValidNumbers = (numbers, count) => {
  const alertCases = [];

  if (numbers.length < count) {
    alertCases.push(MSG_BLANK_INPUT);
  }
  if (!isRangeOf(MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER, numbers)) {
    alertCases.push(MSG_OUT_RANGED_NUMBERS);
  }
  if (isOverlapped(numbers)) {
    alertCases.push(MSG_OVERLAPPED_NUMBERS);
  }

  return alertCases.length === 0 ? '' : alertCases.join(', ') + MSG_SUFFIX;
};
