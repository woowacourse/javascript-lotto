import validator from '../utils/validator';
import { LOTTO, GAME_COMMAND } from '../constants';

const lottoGameValidator = {
  checkPruchaseAmount(input) {
    validator.checkDigit(input);
    const number = Number(input);
    validator.checkGreaterThanOrEqualMin(number, LOTTO.price);
    validator.checkDivideIntoUnit(number, LOTTO.price);
  },

  checkLottoNumber(number) {
    validator.checkGreaterThanOrEqualMin(number, LOTTO.minNumber);
    validator.checkLessThanOrEqualMax(number, LOTTO.maxNumber);
  },

  checkLottoNumbers(numbers) {
    numbers.forEach((number) => {
      lottoGameValidator.checkLottoNumber(number);
    });

    validator.checkArrayLength(numbers, LOTTO.numbersLength);
    validator.checkDuplication(numbers);
  },

  checkWinningNumbers(input) {
    const array = input.split(',');
    array.forEach((value) => {
      validator.checkDigit(value);
    });

    const numbers = array.map(Number);
    lottoGameValidator.checkLottoNumbers(numbers);
  },

  checkBonusNumber(input, winningNumbers) {
    validator.checkDigit(input);
    const number = Number(input);
    lottoGameValidator.checkLottoNumber(number);
    validator.checkDuplication([...winningNumbers, number]);
  },

  checkGameCommand(input) {
    validator.checkIncludes(input, [GAME_COMMAND.yes, GAME_COMMAND.no]);
  },
};

export default lottoGameValidator;
