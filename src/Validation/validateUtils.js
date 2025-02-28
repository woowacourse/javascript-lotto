import { LOTTO_DEFINITION } from '../Domain/Constant/definition.js';

export const hasEmptySpace = (input) => {
  return input.includes(' ') || input.trim() === '';
};

export const isInteger = (input) => {
  return Number.isInteger(input);
};

export const isValidPurchaseAmountUnit = (input) => {
  return input % LOTTO_DEFINITION.ONE_PRICE === 0;
};

export const isValidPurchaseAmountRange = (input) => {
  return (
    input >= LOTTO_DEFINITION.ONE_PRICE && input <= LOTTO_DEFINITION.MAX_PRICE
  );
};

export const hasValidLength = (input) => {
  return LOTTO_DEFINITION.NUMBER_COUNTS === new Set(input).size;
};

export const hasNoDuplicate = (input) => {
  return input.length === new Set(input).size;
};

export const isInValidRange = (input) => {
  return (
    input >= LOTTO_DEFINITION.MIN_NUMBER && input <= LOTTO_DEFINITION.MAX_NUMBER
  );
};

export const hasNoEmptySpaceInArray = (input) => {
  return !input.some(hasEmptySpace);
};

export const hasNoDuplicateBonusNumber = (input, winningNumbersInput) => {
  return !winningNumbersInput.includes(input);
};

export const isValidRetryInput = (input) => {
  return input === 'y' || input === 'n';
};
