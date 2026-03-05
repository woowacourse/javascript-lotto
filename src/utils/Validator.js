import { ERROR_MESSAGE } from "../constants/message.js";

const Validator = {
  validatePrice(price) {
    if (price % 1000 !== 0) {
      throw new Error(ERROR_MESSAGE.INVALID_PURCHASE_UNIT);
    }
  },
  validateLottoNumRange(lottoNums) {
    if (lottoNums.some((lottoNum) => lottoNum > 45 || lottoNum < 1)) {
      throw new Error(ERROR_MESSAGE.INVALID_LOTTO_NUM_RANGE);
    }
  },
  validateDuplicateWinningNum(winningNums) {
    if (winningNums.length !== new Set(winningNums).size) {
      throw new Error(ERROR_MESSAGE.DUPLICATE_WINNING_NUMBERS);
    }
  },
  validateDuplicateBonusNum(winningNums, bonusNum) {
    if (winningNums.includes(bonusNum)) {
      throw new Error(ERROR_MESSAGE.BONUS_IN_WINNING_NUMBERS);
    }
  },
  validateLottoCount(lotto) {
    if (lotto.length !== 6) {
      throw new Error(ERROR_MESSAGE.INVALID_LOTTO_COUNT);
    }
  },
};

export default Validator;
