import InputValidator from './InputValidator.js';
import Console from '../util/Console.js';

const InputChecker = (function () {
  return {
    checkLottoPrice: (lottoPrice, { onError: errorCallback }) => {
      try {
        return InputValidator.isValidLottoPrice(lottoPrice);
      } catch (error) {
        Console.print(error.message);
        return errorCallback({ onError: errorCallback });
      }
    },

    checkLuckyNumbers: (luckyNumbersString, { onError: errorCallback }) => {
      try {
        return InputValidator.isValidLuckyNumbers(luckyNumbersString);
      } catch (error) {
        Console.print(error.message);
        return errorCallback({ onError: errorCallback });
      }
    },

    checkBonusNumber: (
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

    checkRetryCommand: (retryCommand, { onError: errorCallback }) => {
      try {
        return InputValidator.isValidRetryCommand(retryCommand);
      } catch (error) {
        Console.print(error.message);
        return errorCallback({ onError: errorCallback });
      }
    },
  };
})();

export default InputChecker;
