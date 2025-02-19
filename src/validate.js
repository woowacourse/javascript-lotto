import {
  LOTTO_MAX_RANGE,
  LOTTO_MIN_RANGE,
  MAXIMUM_PURCHASE_THRESHOLD,
  PURCHASE_UNIT,
} from "./const.js";

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

const validateWinningNumberisNumeric = (input) => {
  input.forEach((number) => {
    if (Number.isNaN(Number(number))) {
      throw new Error(`당첨 번호는 숫자여야 합니다.`);
    }
  });
};

const validateLottoNumberRange = (input) => {
  if (input < LOTTO_MIN_RANGE || input > LOTTO_MAX_RANGE) {
    throw new Error(
      `당첨 번호가 ${LOTTO_MIN_RANGE}부터 ${LOTTO_MAX_RANGE} 사이의 숫자여야 합니다.`
    );
  }
};

const validateWinningNumberDuplicate = (input) => {
  if (input.length !== new Set(input).size) {
    throw new Error("당첨 번호는 중복되지 않아야 합니다");
  }
};

export {
  validatePurchaseUnit,
  validateIsNumeric,
  validateMinimumValue,
  validateMaximumValue,
  validateWinningNumberisNumeric,
  validateLottoNumberRange,
  validateWinningNumberDuplicate,
};
