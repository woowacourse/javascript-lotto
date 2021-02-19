import { NUMBERS, ALERT_MESSAGES } from './constants.js';

const isInPurchaseRange = input => {
  return (
    NUMBERS.MIN_PURCHASE_LIMIT <= input && input <= NUMBERS.MAX_PURCHASE_LIMIT
  );
};

const isCorrectPurchaseUnit = input => {
  return Math.floor(input / NUMBERS.LOTTO_UNIT) === input / NUMBERS.LOTTO_UNIT;
};

export default function validatePrice(price) {
  if (!isInPurchaseRange(price)) {
    return ALERT_MESSAGES.OUT_OF_RANGE;
  }

  if (!isCorrectPurchaseUnit(price)) {
    return ALERT_MESSAGES.INCORRECT_UNIT;
  }

  return;
}
