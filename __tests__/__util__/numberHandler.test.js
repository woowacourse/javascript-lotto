import NumberHandler from "../../src/util/NumberHandler.js";

describe("NumberHandler 테스트", () => {
  const targetNumbers = [1, 2, 3, 4, 5, 6];

  test.each([
    [[1, 2, 3, 4, 5, 6], 6],
    [[1, 2, 3, 4, 5, 7], 5],
    [[1, 2, 3, 4, 8, 7], 4],
    [[1, 2, 3, 9, 8, 7], 3],
    [[1, 2, 10, 9, 8, 7], 2],
    [[1, 11, 10, 9, 8, 7], 1],
    [[12, 11, 10, 9, 8, 7], 0],
  ])(
    "getMatchCount 테스트) 두 배열의 동일한 숫자 개수를 리턴한다. ",
    (lottoNumbers, matchCount) => {
      expect(NumberHandler.getMatchCount(lottoNumbers, targetNumbers)).toBe(
        matchCount
      );
    }
  );
});
