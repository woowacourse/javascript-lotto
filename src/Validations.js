const Validations = {
  isBuyMoneyNumber(buyMoney) {
    return isNaN(buyMoney) ? false : true;
  },

  isDevidedByThousand(buyMoney) {
    return buyMoney % 1000 === 0;
  },

  isPositiveInteger(buyMoney) {
    return buyMoney > 0;
  },
};

export default Validations;
