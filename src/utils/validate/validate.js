import {
  LOTTO_MAX_RANGE,
  LOTTO_MIN_RANGE,
  MAXIMUM_PURCHASE_THRESHOLD,
  PURCHASE_UNIT,
} from "../../config/const.js";

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

const validateBonusNumberUnique = (winningNumber, bonusNumber) => {
  if (winningNumber.includes(bonusNumber))
    throw new Error("보너스 번호는 당첨 번호와 중복되면 안됩니다.");
};

const validateRestartInput = (input) => {
  if (input !== "y" && input !== "n")
    throw new Error("입력은 y 또는 n만 가능합니다.");
};

const validateWinningNumbersLength = (winningNumber) => {
  if (winningNumber.length !== 6) {
    throw new Error("당첨 번호는 6개여야 합니다.");
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
  validateBonusNumberUnique,
  validateRestartInput,
  validateWinningNumbersLength,
};
