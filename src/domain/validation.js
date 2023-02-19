const { ERRORMESSAGES, LOTTO } = require("../constant/Constant");

const Validation = {
  validateMoney(money) {
    if (money <= 0 || money % 1000 != 0)
      throw Error(ERRORMESSAGES.isWrongMoneyText);
  },

  validateWinNumber(winNumbers) {
    if (
      winNumbers.some((num) => LOTTO.MIN > num || num > LOTTO.MAX || isNaN(num))
    )
      throw new Error(ERRORMESSAGES.isOverRangeNumberText);
    if (winNumbers.length != 6)
      throw new Error(ERRORMESSAGES.isWrongLottoNumberText);

    const winSet = new Set(winNumbers);
    if (winSet.size != LOTTO.SIZE)
      throw new Error(ERRORMESSAGES.isSameLottoNumberText);
  },

  validateBonusNumber(numbers, bonusNumber) {
    const number = parseInt(bonusNumber);

    if (LOTTO.MIN > number || number > LOTTO.MAX || isNaN(number))
      throw new Error(ERRORMESSAGES.isOverRangeBounsText);

    if (numbers.includes(number))
      throw new Error(ERRORMESSAGES.isSameBonusNumberText);
  },

  validateRestartCommand(command) {
    if (command != "y" && command != "n")
      throw new Error(ERRORMESSAGES.isWrongCommandText);
  },
};

module.exports = Validation;
