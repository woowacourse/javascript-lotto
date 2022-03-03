import {
  isValidTypeNumber,
  isValidEmptyValue,
  isValidNumberRange,
  isValidOverlap,
} from "../utils/general.js";

/* eslint-disable no-undef */
describe("당첨 번호 유효성 테스트", () => {
  const numbers = [1, 2, 3, 4, 5, 6];
  test("숫자만 입력할 수 있다.", () => {
    expect(numbers.some((number) => isValidTypeNumber(number))).toBeFalsy();
  });

  test("6개 전부 입력을 해야 한다.", () => {
    expect(numbers.some((number) => isValidEmptyValue(number))).toBeFalsy();
  });

  test("1~45 범위 안으로 입력할 수 있다.", () => {
    const min = 1;
    const max = 45;
    expect(numbers.some((number) => isValidNumberRange(number, min, max))).toBeFalsy();
  });

  test("중복없이 입력해야 한다.", () => {
    expect(isValidOverlap(numbers)).toBeFalsy();
  });
});
