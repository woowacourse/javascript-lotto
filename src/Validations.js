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
  }
};

export default Validations;
