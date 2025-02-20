import formatLottoNumbers from "./formatLottoNumbers.js";

describe("formatLottoNumbers 테스트", () => {
  test("array는 [1, 2, 3, 4, 5, 6] 형식으로 문자열 포맷팅된다.", () => {
    const array = [1, 2, 3, 4, 5, 6];
    expect(formatLottoNumbers(array)).toBe("[1, 2, 3, 4, 5, 6]");
  });
});
