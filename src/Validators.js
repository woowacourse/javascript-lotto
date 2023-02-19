import Lotto from "./constants/Lotto";

const Validators = {
  isNumber(input) {
    return (/[0-9]/g.test(input))
  },

  isString(input) {
    return typeof input === "string";
  },

  isDevidedByThousand(buyMoney) {
    return buyMoney % Lotto.LOTTO_PRICE === Lotto.ZERO;
  },

  isPositiveInteger(input) {
    return input > Lotto.ZERO && input % 1 === Lotto.ZERO;
  },

  isCorrectRange(input) {
    return Lotto.MIN_NUMBER <= input && input <= Lotto.MAX_NUMBER;
  },

  hasBonusNumber(bonusNumber, winningLotto) {
    return winningLotto.includes(bonusNumber);
  },

  isCorrectRetryInput(retryInput) {
    console.log(retryInput === Lotto.RETRY_DOWNER);
    return (
      retryInput === Lotto.RETRY_DOWNER || retryInput === Lotto.QUIT_DOWNER
    );
  },

  isCorrectLength(lottoNumbers) {
    return lottoNumbers.length === Lotto.MAX_LENGTH;
  },

  isDuplicatedNumbers(randomNumbers) {
    return new Set(randomNumbers).size === randomNumbers.length;
  },
};

export default Validators;
