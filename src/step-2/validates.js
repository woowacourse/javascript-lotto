import ERROR_MESSAGE from '../constants/errorMessage.js';

export const validatePurchaseAmountInput = (userInput) => {
  if (userInput.trim() === '') {
    throw new Error(ERROR_MESSAGE.AMOUNT.REQUIRED);
  }

  const amountNumber = Number(userInput);
  if (Number.isNaN(amountNumber) || amountNumber <= 0) {
    throw new Error(ERROR_MESSAGE.AMOUNT.POSITIVE);
  }
};

export const validateWinningNumber = (userInput) => {
  if (userInput.trim() === '') {
    throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.REQUIRED);
  }

  const winningNumber = Number(userInput);
  if (Number.isNaN(winningNumber)) {
    throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.NUMBER);
  }
};

export const validateBonusNumber = (userInput) => {
  if (userInput.trim() === '') {
    throw new Error(ERROR_MESSAGE.BONUS_NUMBER.REQUIRED);
  }

  const bonusNumber = Number(userInput);
  if (Number.isNaN(bonusNumber)) {
    throw new Error(ERROR_MESSAGE.BONUS_NUMBER.NUMBER);
  }
};
