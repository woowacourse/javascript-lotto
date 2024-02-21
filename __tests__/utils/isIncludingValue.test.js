import { isIncludingValue } from "../../src/utils/isIncludingValue.js";
describe("특정 값 포함 확인 유틸 테스트", () => {
  test("배열 안에 특정 값이 포함되면 참을 반환한다.", () => {
    const array = [1, 2, 3, 4, 5];
    const value = 3;
    expect(isIncludingValue(array, value)).toBe(true);
  });

  test("배열 안에 특정 값이 포함되지 않으면 거짓을 반환한다.", () => {
    const array = [1, 2, 3, 4, 5];
    const value = 6;
    expect(isIncludingValue(array, value)).toBe(false);
  });
});
