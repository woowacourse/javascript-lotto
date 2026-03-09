import { Validator } from "../src/validator/Validator.js";
import { ERROR_MESSAGE } from "../src/constants/constant.js";

describe("구입 금액", () => {
  test("구입 금액이 1000원 미만일 시 에러가 발생한다.", () => {
    expect(() => Validator.validatePurchaseMoney(900)).toThrow(
      ERROR_MESSAGE.PURCHASE_MONEY.MIN,
    );
  });
  test("구입 금액이 숫자가 아닐 시 에러가 발생한다.", () => {
    expect(() => Validator.validatePurchaseMoney("900a")).toThrow(
      ERROR_MESSAGE.PURCHASE_MONEY.NUMBER,
    );
  });
  test("구입 금액이 1000원 단위가 아닐 시 에러가 발생한다.", () => {
    expect(() => Validator.validatePurchaseMoney(1900)).toThrow(
      ERROR_MESSAGE.PURCHASE_MONEY.UNIT,
    );
  });
});

describe("당첨 번호", () => {
  test("당첨 번호가 6개가 아닐 시 에러가 발생한다.", () => {
    expect(() => Validator.validateWinningNumber("1,2,3,4,5")).toThrow(
      ERROR_MESSAGE.WINNING_NUMBER.LENGTH,
    );
  });
  test("당첨 번호 숫자가 1 ~ 45 사이가 아닐 시 에러가 발생한다.", () => {
    expect(() => Validator.validateWinningNumber("1,2,3,4,5,46")).toThrow(
      ERROR_MESSAGE.WINNING_NUMBER.RANGE,
    );
  });
  test("콤마(,) 이외의 문자를 입력 받을 시 에러가 발생한다.", () => {
    expect(() => Validator.validateWinningNumber("1,a,2,3,4,5")).toThrow(
      ERROR_MESSAGE.WINNING_NUMBER.REGEX,
    );
  });
  test("콤마(,) 사이에 숫자가 없을 시 에러가 발생한다.", () => {
    expect(() => Validator.validateWinningNumber("1,,2,3,4,5")).toThrow(
      ERROR_MESSAGE.WINNING_NUMBER.COMMA,
    );
  });
  test("당첨 번호가 중복일 시 에러가 발생한다.", () => {
    expect(() => Validator.validateWinningNumber("1,1,2,3,4,5")).toThrow(
      ERROR_MESSAGE.WINNING_NUMBER.DUPLICATE,
    );
  });
});

describe("보너스 번호", () => {
  test("당첨 번호 숫자가 1 ~ 45 사이가 아닐 시 에러가 발생한다.", () => {
    expect(() => Validator.validateBonusNumber("1,2,3,4,5,6", 46)).toThrow(
      ERROR_MESSAGE.BONUS_NUMBER.RANGE,
    );
  });
  test("숫자가 아닐 시 에러가 발생한다.", () => {
    expect(() => Validator.validateBonusNumber("1,2,3,4,5,6", "a")).toThrow(
      ERROR_MESSAGE.BONUS_NUMBER.NUMBER,
    );
  });
  test("당첨 번호랑 중복일 시 에러가 발생한다.", () => {
    expect(() => Validator.validateBonusNumber("1,2,3,4,5,6", 6)).toThrow(
      ERROR_MESSAGE.BONUS_NUMBER.DUPLICATE,
    );
  });
});

describe("재시작", () => {
  test("y, Y, n, N 이외를 입력 시 에러가 발생한다.", () => {
    expect(() => Validator.validateRetry("a")).toThrow(
      ERROR_MESSAGE.RETRY.INVALID,
    );
  });
  test("y, Y, n, N 이외를 입력 시 에러가 발생한다.", () => {
    expect(() => Validator.validateRetry("2")).toThrow(
      ERROR_MESSAGE.RETRY.INVALID,
    );
  });
});
