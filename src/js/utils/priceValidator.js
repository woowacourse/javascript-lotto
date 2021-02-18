import { NUMBERS, ALERT_MESSAGES } from './constants.js';

const isCorrectUnit = input => {
  return Math.floor(input / NUMBERS.LOTTO_UNIT) === input / NUMBERS.LOTTO_UNIT;
};

export default function priceValidator(price) {
  if (!isCorrectUnit(price)) {
    return ALERT_MESSAGES.INCORRECT_UNIT;
  }
  return;
}
