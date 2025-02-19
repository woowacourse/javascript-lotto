import { ListChecker, NumberChecker, StringChecker } from "../src/Checkers.js";

describe("StringChecker 테스트", () => {
  test("String이 주어졌을 때 정규식에 만족하는 지 검사한다.", () => {
    const TRUE_STRING = "10";
    const FALSE_STRING = "1e2";

    expect(StringChecker.isRegString(TRUE_STRING, /^[0-9]+$/)).toBe(true);
    expect(StringChecker.isRegString(FALSE_STRING, /^[0-9]+$/)).toBe(false);
  });
});

describe("NumberChecker 테스트", () => {
  test("Number가 주어졌을 때 특정 값보다 작은 지 검사한다.", () => {
    const TRUE_NUMBER = 9;
    const FALSE_NUMBER = 10;

    expect(NumberChecker.isLessThan(TRUE_NUMBER, 10)).toBe(true);
    expect(NumberChecker.isLessThan(FALSE_NUMBER, 10)).toBe(false);
  });

  test("Number가 주어졌을 때 특정 값보다 큰 지 검사한다.", () => {
    const TRUE_NUMBER = 10;
    const FALSE_NUMBER = 9;

    expect(NumberChecker.isMoreThan(TRUE_NUMBER, 9)).toBe(true);
    expect(NumberChecker.isMoreThan(FALSE_NUMBER, 9)).toBe(false);
  });
});

describe("ListChecker 테스트", () => {
  test("List를 받았을 때 요소의 길이를 검사한다.", () => {
    const TRUE_LIST = [1, 2, 3];
    const FALSE_LIST = [1, 2, 3, 4];

    expect(ListChecker.isDefineLength(TRUE_LIST, 3)).toBe(true);
    expect(ListChecker.isDefineLength(FALSE_LIST, 3)).toBe(false);
  });
});
