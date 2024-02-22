import ERROR_MESSAGE from "../constants/errorMessage.js";

const winningLottoNumbersValidation = {
  winningNumbers: {
    sixNumbers: {
      errorMessage: ERROR_MESSAGE.sixNumbers,
      isValid(input) {
        return input.length === 6;
      },
    },

    outOfRange: {
      errorMessage: ERROR_MESSAGE.outOfRange,
      isValid(input) {
        return input.every((number) => number >= 1 && number <= 45);
      },
    },

    notDuplicated: {
      errorMessage: ERROR_MESSAGE.notDuplicated,
      isValid(input) {
        const uniqueNumbers = new Set(input);
        return uniqueNumbers.size === input.length;
      },
    },
  },
};

export default winningLottoNumbersValidation;
