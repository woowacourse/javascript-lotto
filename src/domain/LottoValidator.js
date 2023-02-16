import { LOTTO } from "../constants/index.js";
import InputValidator from "../utils/InputValidator.js";

const LottoValidator = {
  checkMoney(money) {
    InputValidator.checkNaturalNumber(money);
    InputValidator.checkFallApart(money, LOTTO.price);
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
