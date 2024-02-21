const MoneyValidator = {
  validateMoneyType(money) {
    if (Number.isNaN(Number(money))) {
      throw new Error('[ERROR] 구입 금액은 숫자여야 합니다.');
    }
  },

  validateMoneyMinimum(money) {
    if (money <= 0) {
      throw new Error('[ERROR] 구입 금액은 0보다 커야합니다.');
    }
  },

  validateMoneyUnit(money) {
    if (money % 1000 !== 0) {
      throw new Error('[ERROR] 구입 금액은 1000원 단위여야 합니다.');
    }
  },
};

export default MoneyValidator;
