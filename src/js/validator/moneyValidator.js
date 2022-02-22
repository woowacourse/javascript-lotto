const moneyValidator = {
  isCorrectRange(money) {
    return money >= 1000;
  },

  isThousandUnit(money) {
    return money % 1000 === 0;
  },
};

export const validateMoney = (money) => {
  if (!moneyValidator.isCorrectRange(money)) {
    throw new Error('1000원 이상의 금액이 투입되어야 합니다.');
  }

  if (!moneyValidator.isThousandUnit(money)) {
    throw new Error('1000원 단위의 금액이 투입되어야 합니다.');
  }
};
