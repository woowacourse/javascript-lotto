import Rate from "../src/Model/Rate.js";

describe("수익률 계산 검사 테스트", () => {
  test("등수와 금액을 받아서 수익률을 계산한다", () => {
    const statistics = {
      1: 1,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      0: 1,
    };
    const price = 2000;

    const rate = new Rate(statistics, price);

    expect(rate.getRate()).toBe(100000000.0);
  });
});
