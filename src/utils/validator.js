import { ERROR_MESSAGES } from "../constants.js";

export const InputValidator = {
  validatePurchaseAmount(input) {
    if (!input || input.trim() === "") {
      throw new Error(ERROR_MESSAGES.PURCHASE_AMOUNT.EMPTY);
    }

    const amount = Number(input);

    if (Number.isNaN(amount)) {
      throw new Error(ERROR_MESSAGES.PURCHASE_AMOUNT.NOT_NUMBER);
    }
    if (amount <= 0) {
      throw new Error(ERROR_MESSAGES.PURCHASE_AMOUNT.NOT_POSITIVE);
    }
    if (amount % 1000 !== 0) {
      throw new Error(ERROR_MESSAGES.PURCHASE_AMOUNT.NOT_THOUSAND_UNIT);
    }
  },

  validateWinningNumbers(input) {
    if (!input || input.trim() === "") {
      throw new Error(ERROR_MESSAGES.WINNING_NUMBERS.EMPTY);
    }

    const numbers = input.split(",").map(num => Number(num.trim()));

    if (numbers.length !== 6) {
      throw new Error(ERROR_MESSAGES.WINNING_NUMBERS.NOT_SIX);
    }
    if (numbers.some(num => Number.isNaN(num))) {
      throw new Error(ERROR_MESSAGES.WINNING_NUMBERS.NOT_NUMBER);
    }
    if (numbers.some(num => num < 1 || num > 45)) {
      throw new Error(ERROR_MESSAGES.WINNING_NUMBERS.OUT_OF_RANGE);
    }
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== 6) {
      throw new Error(ERROR_MESSAGES.WINNING_NUMBERS.DUPLICATED);
    }
  },

  validateBonusNumber(input, winningNumbers) {
    if (!input || input.trim() === "") {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER.EMPTY);
    }

    const bonusNumber = Number(input.trim());

    if (Number.isNaN(bonusNumber)) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER.NOT_NUMBER);
    }
    if (bonusNumber < 1 || bonusNumber > 45) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER.OUT_OF_RANGE);
    }
    if (winningNumbers.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER.DUPLICATED);
    }
  }
};