const Validator = {
  validatePurchaseMoney(purchaseMoneyInput) {
    if (purchaseMoneyInput === "")
      throw new Error("[ERROR] 구입 금액을 입력해주세요.");

    const purchaseMoney = Number(purchaseMoneyInput);

    if (Number.isNaN(purchaseMoney))
      throw new Error("[ERROR] 구입 금액은 숫자로 입력해야 합니다.");

    if (!Number.isInteger(purchaseMoney))
      throw new Error("[ERROR] 구입 금액은 정수로 입력해야 합니다.");

    if (purchaseMoney <= 0)
      throw new Error("[ERROR] 구입 금액은 양수로 입력해야 합니다.");

    if (purchaseMoney % 1000 !== 0)
      throw new Error("[ERROR] 구입 금액은 1000원 단위로 입력해야 합니다.");
  },
};

export default Validator;
