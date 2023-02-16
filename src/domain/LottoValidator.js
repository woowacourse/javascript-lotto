import { LOTTO } from "../constants/index.js";
import InputValidator from "../utils/InputValidator.js";

const LottoValidator = {
  checkMoney(money) {
    InputValidator.checkNaturalNumber(money);
    InputValidator.checkFallApart(money, LOTTO.price);
  },
  checkWinningNumber(winningNumber) {
    InputValidator.checkArrayLength(winningNumber.split(','), LOTTO.length);
    winningNumber.split(',').forEach((number) => {
      InputValidator.checkLottoNumber(number);
    });
    InputValidator.checkDuplicatedNumbers(winningNumber.split(','));
  },
  checkBonusNumber(bonusNumber) {
    InputValidator.checkLottoNumber(bonusNumber);
  },
  checkLottoDuplicate({ main, bonus }) {
    InputValidator.checkDuplicatedNumbers(main.concat(bonus));
  },
  checkReadRetryCommand(command) {
    InputValidator.checkReadRetryCommand(command);
  },
};

export default LottoValidator;
