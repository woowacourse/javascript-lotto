import InputValidator from "../utils/InputValidator.js";

const LottoValidator = {
  checkMoney(money) {
    InputValidator.checkNaturalNumber(money);
    InputValidator.checkFallApart(money, 1000);
  },
  checkWinningNumber(winningNumber) {
    winningNumber.split(',').forEach((number) => {
      InputValidator.checkLottoNumber(number);
    });
    InputValidator.checkDuplicatedNumbers(winningNumber.split(','));
  },
  checkBonusNumber(bonusNumber) {
    InputValidator.checkLottoNumber(bonusNumber);
  },
  checkLottoDuplicate({ winningNumber, bonusNumber }) {
    InputValidator.checkDuplicatedNumbers(winningNumber.concat(bonusNumber));
  },
  checkReadRetryCommand(command) {
    InputValidator.checkReadRetryCommand(command);
  },
};

export default LottoValidator;
