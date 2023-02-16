import InputValidator from "../utils/InputValidator.js";

const LottoValidator = {
  checkMoney(money) {
    InputValidator.checkNaturalNumber(money);
    InputValidator.checkFallApart(money, 1000);
  },
  checkWinningNumber(winningNumber) {
    winningNumber.forEach((number) => {
      InputValidator.checkLottoNumber(number);
    });
    InputValidator.checkDuplicatedNumbers(winningNumber);
  },
  checkBonusNumber(winningNumber, bonusNumber) {
    InputValidator.checkLottoNumber(bonusNumber);
    InputValidator.checkDuplicatedNumbers(winningNumber.concat(bonusNumber));
  },
  checkReadRetryCommand(command) {
    InputValidator.checkReadRetryCommand(command);
  },
};
export default LottoValidator;
