import Validator from './Validator.js';
import LOTTO from '../constants/lotto.js';

const InputValidator = {
  isValidLottoPrice: input => {
    Validator.isNumericString(input);
    Validator.canDivide(Number(input), LOTTO.PRICE);

    return parseInt(input, 10);
  },

  isValidLuckyNumbers: inputs => {
    const luckyNumbers = inputs.map(value => parseInt(value, 10));

    Validator.isValidRangeNumbers(luckyNumbers, {
      min: LOTTO.MIN_RANGE,
      max: LOTTO.MAX_RANGE,
    });
    Validator.isNonDuplicatedArray(luckyNumbers);

    return luckyNumbers;
  },

  isValidBonusNumber: (input, luckyNumbers) => {
    const bonusNumber = parseInt(input, 10);

    Validator.isValidRangeNumber(bonusNumber, {
      min: LOTTO.MIN_RANGE,
      max: LOTTO.MAX_RANGE,
    });
    Validator.isNotExistInArray(luckyNumbers, bonusNumber);

    return bonusNumber;
  },
};

const InputChecker = {
  checkLottoPrice: input => {
    try {
      return InputValidator.isValidLottoPrice(input);
    } catch (error) {
      alert(error.message);
    }
  },

  checkLuckyNumbers: inputs => {
    try {
      return InputValidator.isValidLuckyNumbers(inputs);
    } catch (error) {
      alert(error.message);
    }
  },

  checkBonusNumber: (input, luckyNumbers) => {
    try {
      return InputValidator.isValidBonusNumber(input, luckyNumbers);
    } catch (error) {
      alert(error.message);
    }
  },
};

export default InputChecker;
