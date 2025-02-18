import { PURCHASE_UNIT } from "./const";

const validatePurchaseUnit = (price) => {
  if (price % PURCHASE_UNIT !== 0) {
    throw new Error(`구입 금액은 ${PURCHASE_UNIT}원 단위로 입력해주세요.`);
  }
};

const validateIsNumeric = (input) => {
  if (Number.isNaN(Number(input))) {
    throw new Error(`숫자를 입력해주세요.`);
  }
};

export { validatePurchaseUnit, validateIsNumeric };
