import { NUMBERS, ALERT_MESSAGES } from './constants.js';

const isInRange = input => {
  return (
    NUMBERS.MIN_PURCHASE_LIMIT <= input && input <= NUMBERS.MAX_PURCHASE_LIMIT
  );
};

const isCorrectUnit = input => {
  return Math.floor(input / NUMBERS.LOTTO_UNIT) === input / NUMBERS.LOTTO_UNIT;
};

export default function priceValidator(price) {
  if (!isInRange(price)) {
    return ALERT_MESSAGES.OUT_OF_RANGE;
  }
  if (!isCorrectUnit(price)) {
    return ALERT_MESSAGES.INCORRECT_UNIT;
  }
  return;
}
