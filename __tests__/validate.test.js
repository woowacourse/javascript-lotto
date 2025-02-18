import {
  validateIsNumeric,
  validateMinimumValue,
  validatePurchaseUnit,
} from "../src/validate";

test("구입급액이 1,000원 단위가 아닐 경우 예외를 발생시킨다.", () => {
  const price = 1500;

  expect(() => validatePurchaseUnit(price)).toThrow(
    "구입 금액은 1000원 단위로 입력해주세요."
  );
});

test("구입금액이 숫자가 아닐 경우", () => {
  const price = "aa";

  expect(() => validateIsNumeric(price)).toThrow("숫자를 입력해주세요.");
});

test("구입 금액이 1000원보다 작은 경우", () => {
  const price = 500;

  expect(() => validateMinimumValue(price)).toThrow(
    "구입 금액은 1000원 이상이여야 합니다."
  );
});
