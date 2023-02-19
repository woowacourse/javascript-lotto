const Validations = {
  isNumber(input) {
    return isNaN(input) ? false : true;
  },

  isDividedByThousand(buyMoney) {
    return buyMoney % 1000 === 0;
  },

  isPositiveInteger(input) {
    return input > 0 && input % 1 === 0;
  },

  isCorrectRange(input) {
    return 0 < input && input < 46;
  },

  //중복허용 X 추가

  hasBonusNumber(bonusNumber, winningLotto) {
    return winningLotto.includes(bonusNumber);
  },

  isCorrectRetryInput(retryInput) {
    return (
      retryInput === "y" ||
      retryInput === "Y" ||
      retryInput === "n" ||
      retryInput === "N"
    );
  },
};

export default Validations;
