import MoneyValidator from './MoneyValidator';
import LottoValidator from './LottoValidator';
import RestartValidator from './RestartValidator';

const Validator = {
  checkReadMoney(money) {
    MoneyValidator.validateMoneyType(money);
    MoneyValidator.validateMoneyMinimum(money);
    MoneyValidator.validateMoneyUnit(money);
  },

  checkLottoNumbers(numbers) {
    LottoValidator.validateNumbersLength(numbers);
    LottoValidator.validateNumbersDuplicate(numbers);
    LottoValidator.validateNumbersType(numbers);
    LottoValidator.validateNumbersRange(numbers);
  },

  checkReadBonusNumber(winningNumbers, number) {
    LottoValidator.validateNumbersDuplicate([...winningNumbers, number]);
    LottoValidator.validateNumbersType([number]);
    LottoValidator.validateNumbersRange([number]);
  },

  checkReadRestartOrExit(restartOption) {
    RestartValidator.validateOptionCharacter(restartOption);
  },
};

export default Validator;
