import LottoRankCalculator from "../src/LottoRankCalculator";
import Lotto from "../src/Lotto";

describe("LottoRankCalculator 클래스 유닛 테스트", () => {
  describe("calculateLottoRank", () => {
    test("당첨 번호와 일치하는 번호의 개수 + 보너스 번호의 포함 여부에 따라 올바른 등수를 반환해야 한다", () => {
      // given
      const lottos = [new Lotto([1, 2, 3, 4, 5, 6])];
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 7;

      // when
      const rank = LottoRankCalculator.calculateLottoRank(
        lottos,
        winningNumbers,
        bonusNumber,
      );

      // then
      expect(rank).toEqual({ 1: 1, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
    });
  });
});
