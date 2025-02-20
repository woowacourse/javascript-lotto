import { ListChecker, NumberChecker, StringChecker } from "../src/Checkers.js";

describe("StringChecker 테스트", () => {
  test("String이 주어졌을 때 정규식에 만족하는 지 검사한다.", () => {
    const TRUE_STRING = "10";
    const FALSE_STRING = "1e2";

    expect(StringChecker.isRegString(TRUE_STRING, /^[0-9]+$/)).toBeTruthy();
    expect(StringChecker.isRegString(FALSE_STRING, /^[0-9]+$/)).toBeFalsy();
  });

  test("String이 주어졌을 때 특정 값이랑 일치하는 지 검사한다.", () => {
    const TRUE_STRING = "a";
    const FALSE_STRING = "b";
    const VALUE = "a";

    expect(StringChecker.isExactString(TRUE_STRING, VALUE)).toBeTruthy();
    expect(StringChecker.isExactString(FALSE_STRING, VALUE)).toBeFalsy();
  })
});

describe("NumberChecker 테스트", () => {
  test("Number가 주어졌을 때 특정 값보다 작은 지 검사한다.", () => {
    const TRUE_NUMBER = 9;
    const FALSE_NUMBER = 10;

    expect(NumberChecker.isLessThan(TRUE_NUMBER, 10)).toBeTruthy();
    expect(NumberChecker.isLessThan(FALSE_NUMBER, 10)).toBeFalsy();
  });

  test("Number가 주어졌을 때 특정 값보다 큰 지 검사한다.", () => {
    const TRUE_NUMBER = 10;
    const FALSE_NUMBER = 9;

    expect(NumberChecker.isMoreThan(TRUE_NUMBER, 9)).toBeTruthy();
    expect(NumberChecker.isMoreThan(FALSE_NUMBER, 9)).toBeFalsy();
  });

  test("Number가 주어졌을 때 그 값이 단위로 나누어 떨어지는 지 검사한다.", () => {
    const TRUE_NUMBER = 1000;
    const FALSE_NUMBER = 1;
    const UNIT = 1000;

    expect(NumberChecker.isUnitNumber(TRUE_NUMBER, UNIT)).toBeTruthy()
    expect(NumberChecker.isUnitNumber(FALSE_NUMBER, UNIT)).toBeFalsy()
  })
});

describe("ListChecker 테스트", () => {
  test("List를 받았을 때 요소의 길이를 검사한다.", () => {
    const TRUE_LIST = [1, 2, 3];
    const FALSE_LIST = [1, 2, 3, 4];

    expect(ListChecker.isDefineLength(TRUE_LIST, 3)).toBeTruthy();
    expect(ListChecker.isDefineLength(FALSE_LIST, 3)).toBeFalsy();
  });

  test("List를 받았을 때 중복된 값이 있는 지 검사한다.", () => {
    const TRUE_LIST = [1, 1, 3, 4];
    const FALSE_LIST = [1, 2, 3, 4];

    expect(ListChecker.hasDuplicateValue(TRUE_LIST)).toBeTruthy()
    expect(ListChecker.hasDuplicateValue(FALSE_LIST)).toBeFalsy()
  })

  test("List를 받았을 때 그 안의 값이 오름차순으로 정렬되었는지 검사한다.", () => {
    const TRUE_LIST = [1,2,3]
    const FALSE_LIST = [3,2,1]

    expect(ListChecker.isUphillList(TRUE_LIST)).toBeTruthy()
    expect(ListChecker.isUphillList(FALSE_LIST)).toBeFalsy()
  })
});
