import { MAXIMUM_PURCHASE_THRESHOLD, PURCHASE_UNIT } from "./const";

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

const validateMinimumValue = (input) => {
  if (input < PURCHASE_UNIT) {
    throw new Error(
      `구입 금액은 ${PURCHASE_UNIT.toLocaleString()}원 이상이여야 합니다.`
    );
  }
};

const validateMaximumValue = (input) => {
  if (input > MAXIMUM_PURCHASE_THRESHOLD) {
    throw new Error(
      `구입 금액은 ${MAXIMUM_PURCHASE_THRESHOLD.toLocaleString()}원 이하여야 합니다.`
    );
  }
};

export {
  validatePurchaseUnit,
  validateIsNumeric,
  validateMinimumValue,
  validateMaximumValue,
};
