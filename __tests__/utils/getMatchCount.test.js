import getMatchCount from "../../src/utils/getMatchCount.js";

describe("두 배열의 값이 몇 개 일치하는지 확인하는 유틸 함수 테스트", () => {
  test("두 배열의 일치하는 요소 개수를 반환한다.", () => {
    const arr1 = [1, 2, 3, 4, 5, 6];
    const arr2 = [4, 5, 6, 7, 8, 9];
    const expectedMatchCount = 3;

    expect(getMatchCount(arr1, arr2)).toBe(expectedMatchCount);
  });
});
