import MoneyValidator from './MoneyValidator';
import LottoValidator from './LottoValidator';
import RestartValidator from './RestartValidator';

const Validator = {
  validateMoney(money) {
    MoneyValidator.validateMoneyType(money);
    MoneyValidator.validateMoneyMinimum(money);
    MoneyValidator.validateMoneyUnit(money);
    return money;
  },

  validateLottoNumbers(numbers) {
    LottoValidator.validateNumbersLength(numbers);
    LottoValidator.validateNumbersDuplicate(numbers);
    LottoValidator.validateNumbersType(numbers);
    LottoValidator.validateNumbersRange(numbers);
    return numbers;
  },

  validateBonusNumber(winningNumbers, number) {
    LottoValidator.validateNumbersDuplicate([...winningNumbers, number]);
    LottoValidator.validateNumbersType([number]);
    LottoValidator.validateNumbersRange([number]);
    return number;
  },

  validateRestartOption(restartOption) {
    RestartValidator.validateOptionCharacter(restartOption);
    return restartOption;
  },
};

export default Validator;
