import { isMultipleOf } from "./predicate.js";

describe("isMultipleOf 함수 테스트", () => {
  test("5000은 1000으로 나눠진다.", () => {
    expect(isMultipleOf(5000, 1000)).toBeTruthy();
  });

  test("5500은 1000으로 나눠지지 않는다.", () => {
    expect(isMultipleOf(5500, 1000)).toBeFalsy();
  });
});
