import { Validator } from "../src/validator/Validator.js";

describe("Validator", () => {
  test("구입 금액이 1000원 미만일 시 에러가 발생한다.", () => {
    expect(() => Validator.validatePurchaseMoney(900)).toThrow(
      "[ERROR] 구입 금액은 1000원 이상입니다.",
    );
  });
  test("구입 금액이 숫자가 아닐 시 에러가 발생한다.", () => {
    expect(() => Validator.validatePurchaseMoney("900a")).toThrow(
      "[ERROR] 구입 금액은 숫자만 입력해야 합니다.",
    );
  });
  test("구입 금액이 1000원 단위가 아닐 시 에러가 발생한다.", () => {
    expect(() => Validator.validatePurchaseMoney(1900)).toThrow(
      "[ERROR] 구입 금액은 1000원 단위입니다.",
    );
  });
});
