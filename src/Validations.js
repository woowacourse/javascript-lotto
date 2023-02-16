const Validations = {
  isNumber(input) {
    return isNaN(input) ? false : true;
  },

  isDevidedByThousand(buyMoney) {
    return buyMoney % 1000 === 0;
  },

  isPositiveInteger(buyMoney) {
    return buyMoney > 0;
  },

  isCorrectRange(winningNumber) {
    return 0 < winningNumber && winningNumber < 45 ? true : false;
  },
};

export default Validations;
