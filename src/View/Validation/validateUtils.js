import { LOTTO_DEFINITION } from '../../Domain/Constant/definition.js';

export const hasEmptySpace = (input) => {
  return input.includes(' ') || input.trim() === '';
};

export const isInteger = (input) => {
  return Number.isInteger(input);
};

export const isInvalidPurchaseAmountUnit = (input) => {
  return input % 1_000 !== 0;
};

export const isInvalidPurchaseAmountRange = (input) => {
  return input < 1_000 || input > 100_000;
};

export const hasWrongLength = (input) => {
  return LOTTO_DEFINITION.NUMBER_COUNTS !== new Set(input).size;
};

export const hasDuplicate = (input) => {
  return input.length !== new Set(input).size;
};

export const hasWrongRange = (input) => {
  return input < 1 || input > 45;
};

export const hasEmptySpaceInArray = (input) => {
  return input.some((input) => hasEmptySpace(input));
};

export const hasDuplicateBonusNumber = (input, winningNumbersInput) => {
  return winningNumbersInput.includes(input);
};

export const isYorN = (input) => {
  return input === 'y' || input === 'n';
};
