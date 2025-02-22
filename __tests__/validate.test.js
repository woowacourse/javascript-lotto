import {
  LOTTO_MAX_RANGE,
  LOTTO_MIN_RANGE,
  MAX_LOTTO_LENGTH,
  MAXIMUM_PURCHASE_THRESHOLD,
  PURCHASE_UNIT,
} from "../src/config/const.js";
import {
  validateIsNumeric,
  validateLottoNumberRange,
  validateMaximumValue,
  validateMinimumValue,
  validatePurchaseUnit,
  validateWinningNumberisNumeric,
  validateWinningNumberDuplicate,
  validateBonusNumberUnique,
  validateRestartInput,
  validateWinningNumbersLength,
} from "../src/utils/validate/validate.js";

describe("구입 금액 입력 예외 테스트", () => {
  test(`구입 급액이 ${PURCHASE_UNIT.toLocaleString()}원 단위가 아닐 경우 예외를 발생시킨다.`, () => {
    const price = 1500;

    expect(() => validatePurchaseUnit(price)).toThrow(
      `구입 금액은 ${PURCHASE_UNIT.toLocaleString()}원 단위로 입력해주세요.`
    );
  });

  test("구입 금액이 숫자가 아닐 경우 예외를 발생시킨다.", () => {
    const price = "aa";

    expect(() => validateIsNumeric(price)).toThrow("숫자를 입력해주세요.");
  });

  test(`구입 금액이 ${PURCHASE_UNIT.toLocaleString()}원보다 작은 경우 예외를 발생시킨다.`, () => {
    const price = 500;

    expect(() => validateMinimumValue(price)).toThrow(
      `구입 금액은 ${PURCHASE_UNIT.toLocaleString()}원 이상이여야 합니다.`
    );
  });

  test(`구입 금액이 ${MAXIMUM_PURCHASE_THRESHOLD.toLocaleString()}원을 초과할 경우 예외를 발생시킨다.`, () => {
    const price = 25000;
    expect(() => validateMaximumValue(price)).toThrow(
      `구입 금액은 ${MAXIMUM_PURCHASE_THRESHOLD.toLocaleString()}원 이하여야 합니다.`
    );
  });
});

describe("당첨 번호와 보너스 번호 입력 예외 테스트", () => {
  test("당첨번호가 숫자가 아닐 경우 예외를 발생시킨다.", () => {
    const numbers = [1, 2, 3, 4, 5, "aa"];
    expect(() => validateWinningNumberisNumeric(numbers)).toThrow(
      "당첨 번호는 숫자여야 합니다."
    );
  });

  test(`당첨 번호가 ${LOTTO_MIN_RANGE}부터 ${LOTTO_MAX_RANGE} 사이가 아니라면 예외를 발생시킨다.`, () => {
    const number = 46;
    expect(() => validateLottoNumberRange(number)).toThrow(
      `당첨 번호가 ${LOTTO_MIN_RANGE}부터 ${LOTTO_MAX_RANGE} 사이의 숫자여야 합니다.`
    );
  });

  test("당첨 번호가 서로 중복되는 경우 예외를 발생시킨다.", () => {
    const numbers = [1, 1, 2, 3, 4, 5];
    expect(() => {
      validateWinningNumberDuplicate(numbers);
    }).toThrow("당첨 번호는 중복되지 않아야 합니다");
  });

  test(`당첨 번호가 ${MAX_LOTTO_LENGTH}개가 아닐 경우 예외를 발생기킨다`, () => {
    const winningNumber = [1, 2, 3, 4, 5, 6, 7];
    expect(() => validateWinningNumbersLength(winningNumber)).toThrow(
      `당첨 번호는 ${MAX_LOTTO_LENGTH}개여야 합니다.`
    );
  });

  test("당첨 번호와 보너스 번호가 중복되는 경우 예외를 발생시킨다.", () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 1;

    expect(() =>
      validateBonusNumberUnique(winningNumbers, bonusNumber)
    ).toThrow("보너스 번호는 당첨 번호와 중복되면 안됩니다.");
  });
});

test("재시작 여부 입력 시 y/n이 아닐 경우 예외를 발생시킨다.", () => {
  expect(() => validateRestartInput("o")).toThrow(
    "입력은 y 또는 n만 가능합니다."
  );
});
