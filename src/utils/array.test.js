import { getIntersection, shuffle } from "./array.js";

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

describe("shuffle 함수 테스트", () => {
  test("배열의 셔플 전과 후는 다르다", () => {
    const beforeShuffledNumbers = [1, 2, 3, 4, 5, 6];
    const afterShuffledNumbers = shuffle(beforeShuffledNumbers);

    expect(beforeShuffledNumbers).not.toEqual(afterShuffledNumbers);
  });

  test("배열이 아닌 값을 입력하면 에러가 발생한다.", () => {
    expect(() => shuffle("123")).toThrow("인자가 배열이 아닙니다.");
  });
});
