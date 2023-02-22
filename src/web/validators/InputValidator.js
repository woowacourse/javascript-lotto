import Validator from './Validator.js';
import LOTTO from '../constant/lotto.js';
import inputUtils from '../util/inputUtils.js';

const InputValidator = (function () {
  return {
    isValidLottoPrice: lottoPrice => {
      Validator.isNumericString(lottoPrice);
      Validator.canDivide(Number(lottoPrice), LOTTO.PRICE);

      return parseInt(lottoPrice, 10);
    },

    isValidLuckyNumbers: luckyNumbersString => {
      const luckyNumbers = inputUtils.formatLuckyNumbers(luckyNumbersString);

      Validator.isValidLuckyNumbersFormat(luckyNumbersString);
      Validator.isValidRangeNumbers(luckyNumbers, {
        min: LOTTO.MIN_RANGE,
        max: LOTTO.MAX_RANGE,
      });
      Validator.isValidSize(luckyNumbers, LOTTO.NUMBERS_LENGTH);
      Validator.isNonDuplicatedArray(luckyNumbers);

      return luckyNumbers;
    },

    isValidBonusNumber: (bonusNumberString, luckyNumbers) => {
      const bonusNumber = parseInt(bonusNumberString, 10);

      Validator.isValidRangeNumber(bonusNumber, {
        min: LOTTO.MIN_RANGE,
        max: LOTTO.MAX_RANGE,
      });
      Validator.isNotExistInArray(luckyNumbers, bonusNumber);

      return bonusNumber;
    },

    isValidRetryCommand: retryCommand => {
      Validator.isValidRetryCommand(retryCommand);

      return retryCommand;
    },
  };
})();

export default InputValidator;
