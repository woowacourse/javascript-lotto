import { ERROR_MESSAGE, LOTTO_CONSTANT, WINNING_PRIZE } from '../data/constants.js';
import Validator from '../utils/Validator.js';

const LottoUtils = {
  createLottoNumbers() {
    const numbers = new Array(LOTTO_CONSTANT.MAX_NUMBER).fill().map((_, index) => index + 1);
    const lottoNumbers = [];
    Array.from({ length: LOTTO_CONSTANT.LENGTH }).forEach(() => {
      const idx = Math.floor(Math.random() * numbers.length);
      lottoNumbers.push(numbers[idx]);
      numbers.splice(idx, 1);
    });

    return lottoNumbers.slice(0, LOTTO_CONSTANT.LENGTH);
  },

  calculateYieldRate(winningResult, lottoCount) {
    const totalPrize = Object.keys(winningResult).reduce(
      (sum, rank) => sum + WINNING_PRIZE[rank] * winningResult[rank],
      0
    );
    return ((totalPrize / (LOTTO_CONSTANT.PRICE * lottoCount)) * 100).toFixed(1);
  },

  validateBudget(budget) {
    if (!Validator.isInteger(budget))
      throw new Error(ERROR_MESSAGE.NOT_INTEGER(LOTTO_CONSTANT.BUDGET));
    if (!budget || budget % LOTTO_CONSTANT.PRICE !== 0)
      throw new Error(ERROR_MESSAGE.BUDGET_NOT_DIVISIBLE_BY_LOTTO_PRICE);
    if (budget < LOTTO_CONSTANT.PRICE) throw new Error(ERROR_MESSAGE.BUDGET_LESS_THAN_LOTTO_PRICE);
  },

  validateRetryCommand(command) {
    if (command !== 'y' && command !== 'n') throw new Error(ERROR_MESSAGE.RETRY_COMMAND);
  },
};

export default LottoUtils;
