import { getIntersection } from "./array.js";

describe("getIntersection 함수 테스트", () => {
  test("두 배열의 공통 원소는 5개이다.", () => {
    const array1 = [1, 2, 3, 4, 5, 6];
    const array2 = [1, 2, 3, 4, 5, 10];

    expect(getIntersection(array1, array2)).toHaveLength(5);
  });
});
