import Lotto from "./constants/LottoGame";

const Validators = {
  isNumber(input) {
    return /[0-9]/g.test(input);
  },

  isString(input) {
    return typeof input === "string";
  },

  isDevidedByThousand(buyMoney) {
    return buyMoney % Lotto.LOTTO_PRICE === 0;
  },

  isPositiveInteger(input) {
    return input > 0 && input % 1 === 0;
  },

  isCorrectRange(input) {
    return Lotto.MIN_NUMBER <= input && input <= Lotto.MAX_NUMBER;
  },

  hasBonusNumber(bonusNumber, winningLotto) {
    return winningLotto.includes(bonusNumber);
  },

  isCorrectRetryInput(retryInput) {
    return (
      retryInput === Lotto.RETRY_DOWNER || retryInput === Lotto.QUIT_DOWNER
    );
  },

  isCorrectLength(lottoNumbers) {
    return lottoNumbers.length === Lotto.MAX_LENGTH;
  },

  isDuplicatedNumbers(lottoNumbers) {
    return new Set(lottoNumbers).size !== lottoNumbers.length;
  },
};

export default Validators;
