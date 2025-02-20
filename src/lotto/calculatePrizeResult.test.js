import calculatePrizeResult from "./calculatePrizeResult.js";

describe("calculatePrizeResult 함수 테스트", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 10];
  const bonusNumber = 6;

  test("3개 일치 1개 / 5개 + 보너스 일치 1개", () => {
    const lottoNumbers = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 40, 41, 42],
    ];
    const result = new Map([
      [3, 1],
      [4, 0],
      [5, 0],
      ["5B", 1],
      [6, 0],
    ]);

    expect(
      calculatePrizeResult(lottoNumbers, winningNumbers, bonusNumber)
    ).toEqual(result);
  });

  test("2개 일치 1개 / 5개 + 보너스 일치 1개, 6개 일치 1개", () => {
    const lottoNumbers = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 40, 41, 42, 43],
      [1, 2, 3, 4, 5, 10],
    ];
    const result = new Map([
      [3, 0],
      [4, 0],
      [5, 0],
      ["5B", 1],
      [6, 1],
    ]);

    expect(
      calculatePrizeResult(lottoNumbers, winningNumbers, bonusNumber)
    ).toEqual(result);
  });

  test("0개 일치", () => {
    const lottoNumbers = [[40, 41, 42, 43, 44, 45]];
    const result = new Map([
      [3, 0],
      [4, 0],
      [5, 0],
      ["5B", 0],
      [6, 0],
    ]);

    expect(
      calculatePrizeResult(lottoNumbers, winningNumbers, bonusNumber)
    ).toEqual(result);
  });
});
