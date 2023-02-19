const { ERROR_MESSAGES, LOTTO } = require("../constant/Constant");

const Validation = {
  validateMoney(money) {
    if (money <= 0 || money % 1000 != 0)
      throw Error(ERROR_MESSAGES.isWrongMoneyText);
  },

  validateWinNumber(winNumbers) {
    if (
      winNumbers.some((num) => LOTTO.MIN > num || num > LOTTO.MAX || isNaN(num))
    )
      throw new Error(ERROR_MESSAGES.isOverRangeNumberText);
    if (winNumbers.length != 6)
      throw new Error(ERROR_MESSAGES.isWrongLottoNumberText);

    const winSet = new Set(winNumbers);
    if (winSet.size != LOTTO.NUM_SIZE)
      throw new Error(ERROR_MESSAGES.isSameLottoNumberText);
  },

  validateBonusNumber(winLotto, bonusNumber) {
    if (
      LOTTO.MIN > bonusNumber ||
      bonusNumber > LOTTO.MAX ||
      isNaN(bonusNumber)
    )
      throw new Error(ERROR_MESSAGES.isOverRangeBounsText);
    if (winLotto.includes(bonusNumber))
      throw new Error(ERROR_MESSAGES.isSameBonusNumberText);
  },

  validateRestartCommand(command) {
    if (command != "y" && command != "n")
      throw new Error(ERROR_MESSAGES.isWrongCommandText);
  },
};

module.exports = Validation;
