const Calculation = require("../src/utils/calculation");

describe("당첨된 상금과 수익률을 계산하는 함수", () => {
  test("5등 1명인 경우 상금 5000원 반환", () => {
    expect(Calculation.getPrize([1, 0, 0, 0, 0])).toEqual(5000);
  });

  test("2등인 경우 상금 3천만원 반환", () => {
    expect(Calculation.getPrize([0, 0, 0, 1, 0])).toEqual(30000000);
  });
});
