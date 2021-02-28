import {
  MSG_BLANK_INPUT,
  MSG_OUT_RANGED_LOTTO_NUMBERS,
  MSG_DUPLICATED_LOTTO_NUMBERS,
  MSG_NOT_ENOUGH_MONEY,
} from '../constants/alertMessage.js';
import {
  WINNING_NUMBER_COUNT,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
  MSG_INVALID_PURCHASE_AMOUNT,
  UNIT_AMOUNT,
} from '../constants/index.js';

const isRangeOf = (min, max, numbers) => numbers.every(number => min <= number && number <= max);

const isDuplicated = numbers => numbers.length !== new Set(numbers).size;

export const validator = {
  purchaseAmount: money => {
    if (!(money / UNIT_AMOUNT > 0 && money % UNIT_AMOUNT === 0)) {
      return MSG_INVALID_PURCHASE_AMOUNT;
    }

    return '';
  },
  autoPurchase: (money, amount) => {
    if (amount * UNIT_AMOUNT > money) {
      return MSG_NOT_ENOUGH_MONEY;
    }

    return '';
  },
  manualPurchase: money => {
    if (money < UNIT_AMOUNT) {
      return MSG_NOT_ENOUGH_MONEY;
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
    if (isDuplicated(numbers)) {
      return MSG_DUPLICATED_LOTTO_NUMBERS;
    }

    return '';
  },
};
