const { ERROR_MESSAGES, LOTTO } = require("../constant/Constant");

const Validation = {
  validateMoney(money) {
    if (money <= 0 || money % 1000 !== 0) {
      throw Error(ERROR_MESSAGES.isWrongMoney);
    }
  },

  validateWinNumber(winNumbers) {
    if (
      winNumbers.some((num) => LOTTO.MIN > num || num > LOTTO.MAX || isNaN(num))
    ) {
      throw new Error(ERROR_MESSAGES.isOverRangeNumber);
    }
    if (winNumbers.length != LOTTO.NUM_SIZE) {
      throw new Error(ERROR_MESSAGES.isWrongLottoNumber);
    }

    if (new Set(winNumbers).size != LOTTO.NUM_SIZE) {
      throw new Error(ERROR_MESSAGES.isSameLottoNumber);
    }
  },

  validateBonusNumber(winLotto, bonusNumber) {
    if (
      bonusNumber < LOTTO.MIN ||
      bonusNumber > LOTTO.MAX ||
      isNaN(bonusNumber)
    ) {
      throw new Error(ERROR_MESSAGES.isOverRangeBouns);
    }
    if (winLotto.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGES.isSameBonusNumber);
    }
  },

  validateRestartCommand(command) {
    if (command !== "y" && command !== "n") {
      throw new Error(ERROR_MESSAGES.isWrongCommand);
    }
  },
};

module.exports = Validation;
