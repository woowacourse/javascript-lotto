import { LOTTO_CONDITION } from "../../constants/constants.js";

export const bonusNumberValidator = {
  isInteger(number) {
    return Number.isInteger(number);
  },

  isValidRange(number) {
     return number >= LOTTO_CONDITION.MIN_NUMBER && number <= LOTTO_CONDITION.MAX_NUMBER;
  },

  isDuplicated(winningNumbers, bonusNumber) {
    return winningNumbers.includes(bonusNumber);
 },
};
