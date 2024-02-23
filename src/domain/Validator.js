import { Lotto, Restart, Money } from './validator/index';

const Validator = {
  checkReadMoney(money) {
    Money.validateMoneyType(money);
    Money.validateMoneyMinimum(money);
    Money.validateMoneyUnit(money);
  },

  checkLottoNumbers(numbers) {
    Lotto.validateNumbersLength(numbers);
    Lotto.validateNumbersDuplicate(numbers);
    Lotto.validateNumbersType(numbers);
    Lotto.validateNumbersRange(numbers);
  },

  checkReadBonusNumber(winningNumbers, number) {
    Lotto.validateNumbersDuplicate([...winningNumbers, number]);
    Lotto.validateNumbersType([number]);
    Lotto.validateNumbersRange([number]);
  },

  checkReadRestartOrExit(restartOption) {
    Restart.validateOptionCharacter(restartOption);
  },
};

export default Validator;
