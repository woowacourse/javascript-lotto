import { isExpectedArrayLength } from "../../src/utils/checkLength.js";

describe("길이 확인 유틸 함수 테스트", () => {
  test(`숫자 배열의 길이가 인자로 주어진 값과 같으면 참을 반환한다.`, () => {
    const array = [1, 2, 3, 4, 5, 6];
    const arrayLength = 6;
    expect(isExpectedArrayLength(array, arrayLength)).toBe(true);
  });
});
