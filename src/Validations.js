const Validations = {
  isNumber(input) {
    return isNaN(input) ? false : true;
  },

  isDevidedByThousand(buyMoney) {
    return buyMoney % 1000 === 0;
  },

  isPositiveInteger(input) {
    return input > 0 && input % 1 === 0;
  },

  isCorrectRange(input) {
    return 0 < input && input < 45 ? true : false;
  },

  hasBonusNumber(bonusNumber, winningLotto) {
    return winningLotto.includes(bonusNumber)
  },

  isCorrectRetryInput(retryInput) {
//core 에 있는지 없는지 검사하는걸로 바꾸기
    return retryInput === "y" || retryInput === "Y" || retryInput === "n" || retryInput === "N"
  }
};

export default Validations;
