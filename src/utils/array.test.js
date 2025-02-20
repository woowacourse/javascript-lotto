import { getIntersection } from "./array.js";

describe("getIntersection 함수 테스트", () => {
  test("두 배열의 공통 원소는 5개이다.", () => {
    const array1 = [1, 2, 3, 4, 5, 6];
    const array2 = [1, 2, 3, 4, 5, 10];

    expect(getIntersection(array1, array2)).toHaveLength(5);
  });

  test("배열이 아닌 값을 입력하면 에러가 발생한다.", () => {
    expect(() => getIntersection("123", [1, 2, 3, 4, 5, 6])).toThrow(
      "인자가 배열이 아닙니다."
    );
  });
});
