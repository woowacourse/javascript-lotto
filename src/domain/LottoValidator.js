import { LOTTO } from '../constants/index.js';
import InputValidator from '../utils/InputValidator.js';

const LottoValidator = {
  checkMoney(money) {
    InputValidator.checkNaturalNumber(money);
    InputValidator.checkFallApart(money, LOTTO.price);
  },
  checkWinningNumber(winningNumber) {
    const numbers = winningNumber.split(',');
    InputValidator.checkArrayLength(numbers, LOTTO.length);
    numbers.forEach((number) => {
      LottoValidator.checkLottoNumber(number);
    });
    InputValidator.checkDuplicatedNumbers(numbers);
  },
  checkLottoNumber(number) {
    InputValidator.checkNaturalNumber(number);
    if (number < LOTTO.min || number > LOTTO.max) {
      throw new Error(`입력값이 ${LOTTO.min}~${LOTTO.max}범위의 숫자가 아닙니다.`);
    }
  },
  checkBonusNumber(bonusNumber) {
    LottoValidator.checkLottoNumber(bonusNumber);
  },
  checkLottoDuplicate({ main, bonus }) {
    InputValidator.checkDuplicatedNumbers(main.concat(bonus));
  },
  checkReadRetryCommand(command) {
    InputValidator.checkReadRetryCommand(command);
  },
};

export default LottoValidator;
