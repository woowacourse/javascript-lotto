import { Validator } from "../src/validator/Validator.js";

describe("구입 금액", () => {
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

describe("당첨 번호", () => {
  test("당첨 번호가 6개가 아닐 시 에러가 발생한다.", () => {
    expect(() => Validator.validateWinningNumber("1,2,3,4,5")).toThrow(
      "[ERROR] 당첨 번호는 6개이어야 합니다.",
    );
  });
  test("당첨 번호 숫자가 1 ~ 45 사이가 아닐 시 에러가 발생한다.", () => {
    expect(() => Validator.validateWinningNumber("1,2,3,4,5,46")).toThrow(
      "[ERROR] 당첨 번호는 1 ~ 45 사이어야 합니다.",
    );
  });
  test("콤마(,) 이외의 문자를 입력 받을 시 에러가 발생한다.", () => {
    expect(() => Validator.validateWinningNumber("1,a,2,3,4,5")).toThrow(
      "[ERROR] 당첨 번호 구분은 콤마(,) 입니다.",
    );
  });
  test("콤마(,) 사이에 숫자가 없을 시 에러가 발생한다.", () => {
    expect(() => Validator.validateWinningNumber("1,,2,3,4,5")).toThrow(
      "[ERROR] 콤마(,) 사이에 숫자를 입력해야 합니다.",
    );
  });
  test("당첨 번호가 중복일 시 에러가 발생한다.", () => {
    expect(() => Validator.validateWinningNumber("1,1,2,3,4,5")).toThrow(
      "[ERROR] 당첨 번호가 중복입니다.",
    );
  });
});
