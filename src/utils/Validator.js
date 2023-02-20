import { SETTINGS } from "../constants/Config.js";

const Validator = {
  isNumber(input) {
    return isNaN(input) ? false : true;
  },

  isDividedByThousand(buyMoney) {
    return buyMoney % 1000 === 0;
  },

  isPositiveInteger(input) {
    return input > 0 && input % 1 === 0;
  },

  isCorrectRange(input) {
    return 0 < input && input < 46;
  },

  isDuplicatedNumber(winningLotto) {
    const duplicatedNumber = [...new Set(winningLotto)];
    return winningLotto.length === duplicatedNumber.length;
  },

  isCorrectLength(winningLotto) {
    return winningLotto.length !== SETTINGS.MAX_WINNING_NUMBER_LENGTH;
  },

  hasBonusNumber(bonusNumber, winningLotto) {
    return winningLotto.includes(bonusNumber);
  },

  isCorrectRetryInput(retryInput) {
    return retryInput === "y" || retryInput === "n";
  },
};

export default Validator;
