import { LOTTO_CONDITION } from '../constants/condition.js';
import { ERROR_MESSAGE } from '../constants/message.js';

const Validation = {
  validatePurchaseAmount(purchaseAmount) {
    if (!this.isNumber(purchaseAmount)) {
      throw new Error(ERROR_MESSAGE.invalidInputType);
    }

    if (!this.isHigherThanLottoPrice(purchaseAmount)) {
      throw new Error(ERROR_MESSAGE.lowerThanLottoPrice);
    }

    if (!this.isDivisibleByLottoPrice(purchaseAmount)) {
      throw new Error(ERROR_MESSAGE.indivisibleByLottoPrice);
    }
  },

  isNumber(purchaseAmount) {
    return Number.isInteger(Number(purchaseAmount));
  },

  isHigherThanLottoPrice(purchaseAmount) {
    return purchaseAmount >= LOTTO_CONDITION.lottoPrice;
  },

  isDivisibleByLottoPrice(purchaseAmount) {
    return purchaseAmount % LOTTO_CONDITION.lottoPrice === 0;
  },

  validateWinningNumbers(winningNumbers) {
    if (!this.isValidWinningNumbersLength(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.invalidLottoNumberLength);
    }

    if (!this.hasOnlyNumber(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.invalidInputType);
    }

    if (!this.isValidWinningNumberRange(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.invalidLottoNumberRange);
    }
  },

  isValidWinningNumbersLength(winningNumbers) {
    return winningNumbers.length === LOTTO_CONDITION.lottoDigits;
  },

  hasOnlyNumber(winningNumbers) {
    return winningNumbers.every((winningNumber) => Number.isInteger(winningNumber));
  },

  isValidWinningNumberRange(winningNumbers) {
    return winningNumbers.every(
      (winningNumber) =>
        LOTTO_CONDITION.lottoNumberMinRange <= winningNumber &&
        winningNumber <= LOTTO_CONDITION.lottoNumberMaxRange
    );
  },
};

export default Validation;
