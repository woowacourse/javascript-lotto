import {
  isMultipleOf,
  isInRange,
  isDuplicate,
  hasNotInteger,
} from "./predicate.js";

describe("isMultipleOf 함수 테스트", () => {
  test("5000은 1000으로 나눠진다.", () => {
    expect(isMultipleOf(5000, 1000)).toBeTruthy();
  });

  test("5500은 1000으로 나눠지지 않는다.", () => {
    expect(isMultipleOf(5500, 1000)).toBeFalsy();
  });

  test("숫자가 아닌 값을 입력하면 에러가 발생한다.", () => {
    expect(() => isMultipleOf("5000", 1000)).toThrow("인자가 숫자가 아닙니다.");
  });
});

describe("isInRange 함수 테스트", () => {
  test("1는 1과 10 사이에 있다.", () => {
    expect(isInRange(1, 1, 10)).toBeTruthy();
  });

  test("0은 1과 10 사이에 없다.", () => {
    expect(isInRange(0, 1, 10)).toBeFalsy();
  });

  test("숫자가 아닌 값을 입력하면 에러가 발생한다.", () => {
    expect(() => isInRange("1", 1, 10)).toThrow("인자가 숫자가 아닙니다.");
  });
});

describe("isDuplicate 함수 테스트", () => {
  test("중복되지 않는 배열을 입력하면 false를 반환한다.", () => {
    expect(isDuplicate([1, 2, 3, 4, 5, 6])).toBeFalsy();
  });

  test("중복된 배열을 입력하면 true를 반환한다.", () => {
    expect(isDuplicate([1, 2, 3, 4, 5, 5])).toBeTruthy();
  });

  test("배열이 아닌 값을 입력하면 에러가 발생한다.", () => {
    expect(() => isDuplicate(123)).toThrow("인자가 배열이 아닙니다.");
  });
});

describe("hasNotInteger 함수 테스트", () => {
  test("소수가 포함된 배열을 인자로 넣어주면 true를 반환한다.", () => {
    expect(hasNotInteger([1.1, 2, 3, 4, 5, 6])).toBeTruthy();
  });

  test("배열이 모두 정수로 이루어져 있다면 false를 반환한다.", () => {
    expect(hasNotInteger([1, 2, 3, 4, 5, 6])).toBeFalsy();
  });

  test("배열이 아닌 값을 입력하면 에러가 발생한다.", () => {
    expect(() => hasNotInteger(123)).toThrow("인자가 배열이 아닙니다.");
  });
});
