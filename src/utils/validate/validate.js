import { PURCHASE, LOTTO } from "../../config/const.js";

const validatePurchaseUnit = (price) => {
  if (price % PURCHASE.UNIT !== 0) {
    throw new Error(
      `구입 금액은 ${PURCHASE.UNIT.toLocaleString()}원 단위로 입력해주세요.`
    );
  }
};

const validateIsNumeric = (input) => {
  if (Number.isNaN(Number(input))) {
    throw new Error(`숫자를 입력해주세요.`);
  }
};

const validateMinimumValue = (input) => {
  if (input < PURCHASE.UNIT) {
    throw new Error(
      `구입 금액은 ${PURCHASE.UNIT.toLocaleString()}원 이상이여야 합니다.`
    );
  }
};

const validateMaximumValue = (input) => {
  if (input > PURCHASE.MAX_AMOUNT) {
    throw new Error(
      `구입 금액은 ${PURCHASE.MAX_AMOUNT.toLocaleString()}원 이하여야 합니다.`
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
  if (input < LOTTO.MIN_NUMBER || input > LOTTO.MAX_NUMBER) {
    throw new Error(
      `당첨 번호가 ${LOTTO.MIN_NUMBER}부터 ${LOTTO.MAX_NUMBER} 사이의 숫자여야 합니다.`
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
  if (winningNumber.length !== LOTTO.MAX_LENGTH) {
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
