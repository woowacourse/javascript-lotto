const Calculation = require("../src/utils/calculation");

describe("당첨된 상금과 수익률을 계산하는 함수", () => {
  test.each([
    [
      [[1, 0, 0, 0, 0], 5000],
      [[0, 0, 0, 1, 0], 30000000],
    ],
  ])("등수별 당첨자 배열로 상금 계산하기 %#", (testCase) => {
    const result = Calculation.getPrize(testCase[0]);
    expect(result).toEqual(testCase[1]);
  });

  test.each([
    [
      [[1, 0, 0, 0, 0], 5000],
      [[0, 0, 0, 1, 0], 30000000],
    ],
  ])("등수별 당첨자 배열로 상금 계산하기 %#", (testCase) => {
    const result = Calculation.getPrize(testCase[0]);
    expect(result).toEqual(testCase[1]);
  });
});
