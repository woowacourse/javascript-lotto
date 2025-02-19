import { isMultipleOf, isInRange, isDuplicate } from "./predicate.js";

describe("isMultipleOf 함수 테스트", () => {
  test("5000은 1000으로 나눠진다.", () => {
    expect(isMultipleOf(5000, 1000)).toBeTruthy();
  });

  test("5500은 1000으로 나눠지지 않는다.", () => {
    expect(isMultipleOf(5500, 1000)).toBeFalsy();
  });
});

describe("isInRange 함수 테스트", () => {
  test("5는 1과 10 사이에 있다.", () => {
    expect(isInRange(5, 1, 10)).toBeTruthy();
  });

  test("11은 1과 10 사이에 없다.", () => {
    expect(isInRange(11, 1, 10)).toBeFalsy();
  });
});

describe("isDuplicate 함수 테스트", () => {
  test("중복되지 않는 배열을 입력하면 false를 반환한다.", () => {
    expect(isDuplicate([1, 2, 3, 4, 5, 6])).toBeFalsy();
  });

  test("중복된 배열을 입력하면 true를 반환한다.", () => {
    expect(isDuplicate([1, 2, 3, 4, 5, 5])).toBeTruthy();
  });
});
