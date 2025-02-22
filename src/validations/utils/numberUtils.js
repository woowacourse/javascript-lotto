
import { LOTTO_CONDITION } from "../../constants/constants.js";

export const numberUtils = {
  isInteger(number) {
    return Number.isInteger(number);
  },

  isLottoRange(number) {
       return number >= LOTTO_CONDITION.MIN_NUMBER && number <= LOTTO_CONDITION.MAX_NUMBER;
  },
};