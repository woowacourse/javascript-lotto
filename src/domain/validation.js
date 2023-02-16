const { ERRORMESSAGES } = require("../constant/Constant");

const Validation = {
  validateMoney(money) {
    if (money <= 0 || money % 1000 != 0)
      throw Error(ERRORMESSAGES.isWrongMoneyText);
  },

  validateWinningNumber(winningNumbers) {
    if (winningNumbers.some((num) => 1 > num || num > 45 || isNaN(num)))
      throw new Error(ERRORMESSAGES.isOverRangeNumberText);
    if (winningNumbers.length != 6)
      throw new Error(ERRORMESSAGES.isWrongLottoNumberText);

    const winSet = new Set(winningNumbers);
    if (winSet.size != 6) throw new Error(ERRORMESSAGES.isSameLottoNumberText);
  },

  validateBonusNumber(winLotto, bonusNumber) {
    if (1 > bonusNumber || bonusNumber > 45 || isNaN(bonusNumber))
      throw new Error(ERRORMESSAGES.isOverRangeBounsText);
    if (winLotto.includes(bonusNumber))
      throw new Error(ERRORMESSAGES.isSameBonusNumberText);
  },

  validateRestartCommand(command) {
    if (command != "y" && command != "n")
      throw new Error(ERRORMESSAGES.isWrongCommandText);
  },
};

module.exports = Validation;
