import { checkNumberRange } from "../utils/checkNumberRange.js";
import {
  ERROR_MESSAGE,
  RETRY_ANSWER,
  MONEY_UNIT,
  LOTTO_RANGE,
} from "../constants/constant.js";
import { RESTART } from "../constants/constant.js";

export const Validator = {
  validatePurchaseMoney(money) {
    if (!money) {
      throw new Error(ERROR_MESSAGE.PURCHASE_MONEY.NONE);
    }
    if (isNaN(money)) {
      throw new Error(ERROR_MESSAGE.PURCHASE_MONEY.NUMBER);
    }
    if (money < MONEY_UNIT) {
      throw new Error(ERROR_MESSAGE.PURCHASE_MONEY.MIN);
    }
    if (money % MONEY_UNIT !== 0) {
      throw new Error(ERROR_MESSAGE.PURCHASE_MONEY.UNIT);
    }
  },

  validateWinningNumber(winningNumber) {
    if (winningNumber === RESTART) return;
    const winningNumberArray = winningNumber.split(",");
    const regex = /^[0-9,]+$/;

    if (winningNumberArray.length !== 6) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBER.LENGTH);
    }
    if (winningNumber.includes(",,")) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBER.COMMA);
    }
    if (checkNumberRange(winningNumberArray).includes(false)) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBER.RANGE);
    }
    if (!regex.test(winningNumber)) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBER.REGEX);
    }

    const set = new Set(winningNumberArray);
    if (set.size < LOTTO_RANGE.COUNT) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBER.DUPLICATE);
    }
  },

  validateBonusNumber(winningNumber, bonusNumber) {
    const winningNumberArray = winningNumber.split(",").map(Number);

    if (bonusNumber < LOTTO_RANGE.MIN || bonusNumber > LOTTO_RANGE.MAX) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER.RANGE);
    }
    if (isNaN(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER.NUMBER);
    }
    if (winningNumberArray.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER.DUPLICATE);
    }
  },

  validateRetry(retry) {
    if (!RETRY_ANSWER.YES.includes(retry) && !RETRY_ANSWER.NO.includes(retry)) {
      throw new Error(ERROR_MESSAGE.RETRY.INVALID);
    }
  },
};
