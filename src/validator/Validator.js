export const Validator = {
  validatePurchaseMoney(money) {
    if (money < 1000) {
      throw new Error("[ERROR] 구입 금액은 1000원 이상입니다.");
    }
    if (isNaN(money)) {
      throw new Error("[ERROR] 구입 금액은 숫자만 입력해야 합니다.");
    }
    if (money % 1000 !== 0) {
      throw new Error("[ERROR] 구입 금액은 1000원 단위입니다.");
    }
  },
};
