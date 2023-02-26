const { errorMessages, lottoProperty } = require("../constant/Constant");

const validation = {
  validateMoney(money) {
    if (money <= 0 || money % 1000 != 0) throw Error(errorMessages.isWrongMoneyText);
  },

  validateWinNumber(winNumbers) {
    if (winNumbers.some((num) => lottoProperty.MIN > num || num > lottoProperty.MAX || isNaN(num)))
      throw new Error(errorMessages.isOverRangeNumberText);
    if (winNumbers.length != lottoProperty.SIZE) throw new Error(errorMessages.isWrongLottoNumberText);

    const winSet = new Set(winNumbers);
    if (winSet.size != lottoProperty.SIZE) throw new Error(errorMessages.isSameLottoNumberText);
  },

  validateBonusNumber(numbers, bonusNumber) {
    const number = parseInt(bonusNumber);
    if (lottoProperty.MIN > number || number > lottoProperty.MAX || isNaN(number)) throw new Error(errorMessages.isOverRangeBounsText);

    const numbersInt = numbers.map((num) => parseInt(num, 10));
    if (numbersInt.includes(number)) throw new Error(errorMessages.isSameBonusNumberText);
  },

  validateRestartCommand(command) {
    if (command != "y" && command != "n") throw new Error(errorMessages.isWrongCommandText);
  },
};

module.exports = validation;
