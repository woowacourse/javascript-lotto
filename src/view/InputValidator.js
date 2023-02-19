import LOTTO from '../constant/lotto.js';
import validator from '../util/validator.js';
import Console from '../util/Console.js';

const InputValidator = (function () {
  return {
    readLottoPrice: (lottoPrice, { onError: errorCallback }) => {
      try {
        return InputValidator.isValidLottoPrice(lottoPrice);
      } catch (error) {
        Console.print(error.message);
        return errorCallback({ onError: errorCallback });
      }
    },

    isValidLottoPrice: lottoPrice => {
      validator.isFirstLetterNotZero(lottoPrice);
      validator.isNumericString(lottoPrice);
      validator.canDivide(Number(lottoPrice), LOTTO.PRICE);

      return parseInt(lottoPrice, 10);
    },

    readLuckyNumbers: (luckyNumbersString, { onError: errorCallback }) => {
      try {
        return InputValidator.isValidLuckyNumbers(luckyNumbersString);
      } catch (error) {
        Console.print(error.message);
        return errorCallback({ onError: errorCallback });
      }
    },

    isValidLuckyNumbers: luckyNumbersString => {
      const luckyNumbers = luckyNumbersString
        .split(',')
        .map(luckyNumber => parseInt(luckyNumber.trim(), 10));

      validator.isValidFormat(luckyNumbersString);
      validator.isValidRangeNumbers(luckyNumbers, { min: 1, max: 45 });
      validator.isValidSize(luckyNumbers, 6);
      validator.isNonDuplicatedArray(luckyNumbers);

      return luckyNumbers;
    },

    readBonusNumber: (
      bonusNumber,
      luckyNumbers,
      { onError: errorCallback }
    ) => {
      try {
        return InputValidator.isValidBonusNumber(bonusNumber, luckyNumbers);
      } catch (error) {
        Console.print(error.message);
        return errorCallback(luckyNumbers, { onError: errorCallback });
      }
    },

    isValidBonusNumber: (bonusNumberString, luckyNumbers) => {
      const bonusNumber = parseInt(bonusNumberString, 10);

      validator.isValidRangeNumber(bonusNumber, {
        min: 1,
        max: 45,
      });
      validator.isNotExistInArray(luckyNumbers, bonusNumber);

      return bonusNumber;
    },

    readRetryCommand: (retryCommand, { onError: errorCallback }) => {
      try {
        return InputValidator.isValidRetryCommand(retryCommand);
      } catch (error) {
        Console.print(error.message);
        return errorCallback({ onError: errorCallback });
      }
    },

    isValidRetryCommand: retryCommand => {
      validator.isValidRetryCommand(retryCommand);

      return retryCommand;
    },
  };
})();

export default InputValidator;
