import { ERROR_MESSAGE } from "../src/constants";
import Validator from "../src/Validator";

describe("유효성 검증 테스트", () => {
  test("[예외] 입력된 문자열이 빈 값이면 에러를 발생시켜야 한다", () => {
    // given
    const wrongInput = "";

    // when & then
    expect(() => Validator.notEmptyString(wrongInput)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  test.each([0, -1])(
    "[예외] 숫자가 양의 정수가 아니면 에러를 발생시켜야 한다 (%s)",
    (wrongNumber) => {
      // when & then
      expect(() => Validator.positiveNumber(wrongNumber)).toThrow(
        ERROR_MESSAGE.PREFIX,
      );
    },
  );

  test("[예외] 숫자가 기준값보다 크면 에러를 발생시켜야 한다", () => {
    // given
    const upper = 45;
    const wrongNumber = 46;

    // when & then
    expect(() => Validator.numberUpper(upper, wrongNumber)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  test("[예외] 숫자가 기준값보다 작으면 에러를 발생시켜야 한다", () => {
    // given
    const lower = 1;
    const wrongNumber = 0;

    // when & then
    expect(() => Validator.numberLower(lower, wrongNumber)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  test("[예외] 입력된 문자열이 숫자가 아니면 에러를 발생시켜야 한다", () => {
    // given
    const wrongInput = "NoNumber";

    // when & then
    expect(() => Validator.stringIsNumber(wrongInput)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  test("[예외] 숫자가 특정 값으로 나누어 떨어지지 않으면 에러를 발생시켜야 한다", () => {
    // given
    const divideNumber = 1000;
    const wrongInput = 1500;

    // when & then
    expect(() => Validator.numberDivided(wrongInput, divideNumber)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  test("[예외] 배열에 중복된 원소가 존재하면 에러를 발생시켜야 한다", () => {
    // given
    const wrongArray = [1, 1, 2, 3, 4, 5];

    // when & then
    expect(() => Validator.notDuplicated(wrongArray)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  test("[예외] 배열의 길이가 올바르지 않으면 에러를 발생시켜야 한다", () => {
    // given
    const wrongArray = [1, 2, 3, 4, 5];

    // when & then
    expect(() => Validator.arrayLength(wrongArray, 6)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  test("[예외] 원하는 값이 배열에 포함되어 있지 않으면 예외를 발생시켜야 한다", () => {
    // given
    const targetElement = "a";
    const array = ["b", "c"];

    // when & then
    expect(() => Validator.includeElement(targetElement, array)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });
});
