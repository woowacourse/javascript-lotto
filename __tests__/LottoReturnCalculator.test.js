import LottoReturnCalculator from "../src/LottoReturnCalculator";

describe("LottoReturnCalculator 클래스 유닛테스트", () => {
  describe("calculateReturnAmount", () => {
    test("등수에 따른 수익 금액을 계산한다.", () => {
      // given
      const rank = { 1: 1, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

      // when
      const returnAmount = LottoReturnCalculator.calculateReturnAmount(rank);

      // then
      expect(returnAmount).toBe(2000000000);
    });
  });

  describe("calculateReturnRate", () => {
    test("수익률을 계산한다.", () => {
      // given
      const returnAmount = 2000000000;
      const purchaseAmount = 10000;

      // when
      const returnRate = LottoReturnCalculator.calculateReturnRate(
        returnAmount,
        purchaseAmount,
      );

      // then
      expect(returnRate).toBe(20000000);
    });
  });
});
