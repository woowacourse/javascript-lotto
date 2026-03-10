import { ERROR_MESSAGE } from "../constants/message.js";

const Validator = {
  validateNumber(input) {
    if (!Number.isInteger(input)) throw new Error(ERROR_MESSAGE.NOT_NUMBER);
  },

  validatePrice(price) {
    if (price % 1000 !== 0) {
      throw new Error(ERROR_MESSAGE.INVALID_PURCHASE_UNIT);
    }
    if (price < 0 || price === 0) {
      throw new Error(ERROR_MESSAGE.INVALID_PURCHASE_UNIT);
    }
  },
  validateLottoNumRange(lottoNum) {
    if (lottoNum > 45 || lottoNum < 1) {
      throw new Error(ERROR_MESSAGE.INVALID_LOTTO_NUM_RANGE);
    }
  },
  validateDuplicateLottoNums(lottoNums) {
    if (lottoNums.length !== new Set(lottoNums).size) {
      throw new Error(ERROR_MESSAGE.DUPLICATE_LOTTO_NUMBERS);
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

  validateRestartAnswer(restartAnswer) {
    if (!(restartAnswer === "y" || restartAnswer === "n")) {
      throw new Error(ERROR_MESSAGE.INVALID_RESTART_ANSWER);
    }
  },
};

export default Validator;
