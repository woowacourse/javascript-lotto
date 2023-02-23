import InputValidator from './InputValidator.js';

const InputChecker = (function () {
  return {
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
})();

export default InputChecker;
