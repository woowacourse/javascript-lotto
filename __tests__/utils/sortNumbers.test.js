import sortNumbersAscend from "../../src/utils/sortNumbersAscend.js";

describe("숫자 배열 정렬 테스트", () => {
  test("숫자 배열을 오름차순으로 정렬한다.", () => {
    const numbers = [5, 1, 45, 23, 31, 11];
    const sortedNumbers = [1, 5, 11, 23, 31, 45];

    expect(sortNumbersAscend(numbers)).toEqual(sortedNumbers);
  });
});
