import { LOTTO, PURCHASE } from "../../config/const.js";
import { ERROR_MESSAGE } from "../../config/message.js";

const validatePurchaseUnit = (price) => {
  if (price % PURCHASE.UNIT !== 0) {
    throw new Error(ERROR_MESSAGE.PURCHASE_UNIT);
  }
};

const validateMinimumValue = (input) => {
  if (input < PURCHASE.UNIT) {
    throw new Error(ERROR_MESSAGE.PURCHASE_MIN_VALUE);
  }
};

const validateMaximumValue = (input) => {
  if (input > PURCHASE.MAX_AMOUNT) {
    throw new Error(ERROR_MESSAGE.PURCHASE_MAX_VALUE);
  }
};

const validateIsNumeric = (input) => {
  if (Number.isNaN(Number(input))) {
    throw new Error(ERROR_MESSAGE.IS_NUMERIC);
  }
};

const validateWinningNumberisNumeric = (input) => {
  input.forEach((number) => {
    if (Number.isNaN(Number(number))) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBER_IS_NUMERIC);
    }
  });
};

const validateLottoNumberRange = (input) => {
  if (input < LOTTO.MIN_NUMBER || input > LOTTO.MAX_NUMBER) {
    throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_RANGE);
  }
};

const validateWinningNumberDuplicate = (input) => {
  if (input.length !== new Set(input).size) {
    throw new Error(ERROR_MESSAGE.WINNING_NUMBER_DUPLICATE);
  }
};

const validateWinningNumbersLength = (winningNumber) => {
  if (winningNumber.length !== LOTTO.MAX_LENGTH) {
    throw new Error(ERROR_MESSAGE.WINNING_NUMBERS_LENGTH);
  }
};

const validateBonusNumberUnique = (winningNumber, bonusNumber) => {
  if (winningNumber.includes(bonusNumber))
    throw new Error(ERROR_MESSAGE.BONUS_NUMBER_UNIQUE);
};

const validateRestartInput = (input) => {
  if (input !== "y" && input !== "n")
    throw new Error(ERROR_MESSAGE.RESTART_INPUT);
};

export {
  validatePurchaseUnit,
  validateIsNumeric,
  validateMinimumValue,
  validateMaximumValue,
  validateWinningNumberisNumeric,
  validateLottoNumberRange,
  validateWinningNumberDuplicate,
  validateBonusNumberUnique,
  validateRestartInput,
  validateWinningNumbersLength,
};
