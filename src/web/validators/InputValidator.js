import Validator from './Validator.js';
import LOTTO from '../constants/lotto.js';

const InputValidator = (function () {
  return {
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
})();

export default InputValidator;
