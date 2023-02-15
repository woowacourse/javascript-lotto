import NumberHandler from "../../src/util/NumberHandler.js";
/**
    - [ ]  범위 내의 랜덤 숫자값 리턴하기 - 범위 테스트하기
 */

describe("NumberHandler 테스트", () => {
  test.each([
    [1.123, 1.1],
    [1.56, 1.6],
    [1.0, 1],
    [100.05, 100.1],
    [100, 100],
  ])("소수점 둘째자리에서 반올림한다.", (floatNumber, roundedOffNumber) => {
    expect(NumberHandler.roundOffNumber(floatNumber)).toBe(roundedOffNumber);
  });
});
