import Lotto from "./constants/Lotto";

const Validations = {
  isNumber(input) {
    return isNaN(input) ? false : true;
  },

  isDevidedByThousand(buyMoney) {
    return buyMoney % Lotto.LOTTO_PRICE === Lotto.ZERO;
  },

  isPositiveInteger(input) {
    return input > Lotto.ZERO && input % 1 === Lotto.ZERO;
  },

  isCorrectRange(input) {
    return Lotto.MIN_NUMBER <= input && input <= Lotto.MAX_NUMBER
      ? true
      : false;
  },

  hasBonusNumber(bonusNumber, winningLotto) {
    return winningLotto.includes(bonusNumber);
  },

  isCorrectRetryInput(retryInput) {
    return (
      retryInput === Lotto.RETRY_DOWNER ||
      retryInput === Lotto.RETRY_UPPER ||
      retryInput === Lotto.QUIT_DOWNER ||
      retryInput === Lotto.QUIT_UPPER
    );
  },

  isCorrectLength(lottoNumbers) {
    return lottoNumbers.length === Lotto.MAX_LENGTH;
  },

  isDuplicatedNumbers(randomNumbers) {
    return new Set(randomNumbers).size === randomNumbers.length;
  },
};

export default Validations;
