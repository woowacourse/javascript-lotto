import ERROR_MESSAGE from "../constants/errorMessage.js";

/**
 * 로또 당첨 번호 배열의 유효성 검사
 */
const winningLottoNumbersValidation = {
  winningNumbers: {
    sixNumbers: {
      errorMessage: ERROR_MESSAGE.SIX_LENGTH,
      isValid(input) {
        return input.length === 6;
      },
    },

    notDuplicated: {
      errorMessage: ERROR_MESSAGE.UNIQUE_NUMBER,
      isValid(input) {
        const uniqueNumbers = new Set(input);
        return uniqueNumbers.size === input.length;
      },
    },
  },
};

export default winningLottoNumbersValidation;
