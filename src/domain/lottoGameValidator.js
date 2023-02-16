import validator from '../utils/validator';

const lottoGameValidator = {
  checkPruchaseAmount(input) {
    validator.checkDigit(input);
    const number = Number(input);
    validator.checkGreaterThanOrEqualMin(number, 1000);
    validator.checkDivideIntoUnit(number, 1000);
  },

  checkLottoNumber(number) {
    validator.checkGreaterThanOrEqualMin(number, 1);
    validator.checkLessThanOrEqualMax(number, 45);
  },

  checkLottoNumbers(numbers) {
    numbers.forEach((number) => {
      lottoGameValidator.checkLottoNumber(number);
    });

    validator.checkArrayLength(numbers, 6);
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

  checkBonusNumbers(input, winningNumbers) {
    validator.checkDigit(input);
    const number = Number(input);
    lottoGameValidator.checkLottoNumber(number);
    validator.checkDuplication([...winningNumbers, number]);
  },
};

export default lottoGameValidator;
