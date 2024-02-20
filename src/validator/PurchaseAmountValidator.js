const purchaseAmountValidator = {
  validateType(price) {
    if (Number.isNaN(Number(price))) {
      throw new Error("[ERROR] 구입 금액은 숫자로 입력해주세요.");
    }
  },

  validateRange(price) {
    if (Number(price) <= 1_000) {
      throw new Error("[ERROR] 1,000원 이상의 값을 입력해주세요");
    }
  },

  validateDivided(price) {
    if (price % 1_000 !== 0) {
      throw new Error("[ERROR] 1,000원 단위로 입력해주세요.");
    }
  },

  validate(price) {
    this.validateType(price);
    this.validateRange(price);
    this.validateDivided(price);
  },
};

export default purchaseAmountValidator;
