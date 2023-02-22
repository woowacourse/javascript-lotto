import InputValidator from '../../console/validators/InputValidator.js';

const InputChecker = (function () {
  return {
    checkLottoPrice: lottoPrice => {
      try {
        return InputValidator.isValidLottoPrice(lottoPrice);
      } catch (error) {
        alert(error.message);
      }
    },

    checkLuckyNumbers: luckyNumbersString => {
      try {
        return InputValidator.isValidLuckyNumbers(luckyNumbersString);
      } catch (error) {
        alert(error.message);
      }
    },

    checkBonusNumber: (bonusNumber, luckyNumbers) => {
      try {
        return InputValidator.isValidBonusNumber(bonusNumber, luckyNumbers);
      } catch (error) {
        alert(error.message);
      }
    },

    checkRetryCommand: retryCommand => {
      try {
        return InputValidator.isValidRetryCommand(retryCommand);
      } catch (error) {
        alert(error.message);
      }
    },
  };
})();

export default InputChecker;
