import { LOTTO_PRICE, LOTTO_SIZE } from "../constants/lottoInfo.js";
import { ERROR_MESSAGE } from "../constants/message.js";

const Validator = {
  validateNumber(input) {
    if (!Number.isInteger(input)) throw new Error(ERROR_MESSAGE.NOT_NUMBER);
  },

  validatePrice(price) {
    if (price % LOTTO_PRICE !== 0) {
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
    if (lotto.length !== LOTTO_SIZE) {
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
