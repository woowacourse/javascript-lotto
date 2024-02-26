import ERROR_MESSAGE from "../constants/errorMessage.js";
import { LOTTO_SETTING } from "../constants/lottoConstants.js";

/**
 * 로또 당첨 번호와 보너스 번호의 공통 유효성 검사
 */
const winningLottoValidation = {
  winningCombination: {
    outOfRange: {
      errorMessage: ERROR_MESSAGE.LOTTO_NUMBER_RANGE,
      isValid(input) {
        return input >= LOTTO_SETTING.MIN_NUMBER && input <= LOTTO_SETTING.MAX_NUMBER;
      },
    },
  },
};

export default winningLottoValidation;
