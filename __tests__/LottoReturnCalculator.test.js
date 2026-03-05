import LottoReturnCalculator from "../src/LottoReturnCalculator";

describe("LottoReturnCalculator 클래스 유닛테스트", () => {
  describe("calculateReturnAmount", () => {
    test("등수에 따른 수익률을 계산한다.", () => {
      // given
      const rank = { 1: 1, 2: 0, 3: 0, 4: 0, 5: 0 };

      // when
      const returnAmount = LottoReturnCalculator.calculateReturnAmount(rank);

      // then
      expect(returnAmount).toBe(2000000000);
    });
  });
});
