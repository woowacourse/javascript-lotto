import LottoRankCalculator from "../src/LottoRankCalculator";
import Lotto from "../src/Lotto";

describe("LottoRankCalculator 클래스 유닛 테스트", () => {
  describe("calculateLottoRank", () => {
    test("당첨 번호와 일치하는 번호의 개수가 6이면 1을 반환한다.", () => {
      // given
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 7;

      // when
      const rank = LottoRankCalculator.calculateLottoRank({
        lotto,
        winningNumbers,
        bonusNumber,
      });

      // then
      expect(rank).toBe(1);
    });

    test("당첨 번호와 일치하는 번호의 개수가 5이고 보너스 번호를 포함하면 2를 반환한다.", () => {
      // given
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const winningNumbers = [1, 2, 3, 4, 5, 7];
      const bonusNumber = 6;

      // when
      const rank = LottoRankCalculator.calculateLottoRank({
        lotto,
        winningNumbers,
        bonusNumber,
      });

      // then
      expect(rank).toBe(2);
    });

    test("당첨 번호와 일치하는 번호의 개수가 5이면 3을 반환한다.", () => {
      // given
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const winningNumbers = [1, 2, 3, 4, 5, 7];
      const bonusNumber = 8;

      // when
      const rank = LottoRankCalculator.calculateLottoRank({
        lotto,
        winningNumbers,
        bonusNumber,
      });

      // then
      expect(rank).toBe(3);
    });

    test("당첨 번호와 일치하는 번호의 개수가 4이면 4를 반환한다.", () => {
      // given
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const winningNumbers = [1, 2, 3, 4, 7, 8];
      const bonusNumber = 9;

      // when
      const rank = LottoRankCalculator.calculateLottoRank({
        lotto,
        winningNumbers,
        bonusNumber,
      });

      // then
      expect(rank).toBe(4);
    });

    test("당첨 번호와 일치하는 번호의 개수가 3이면 5를 반환한다.", () => {
      // given
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const winningNumbers = [1, 2, 3, 7, 8, 9];
      const bonusNumber = 10;

      // when
      const rank = LottoRankCalculator.calculateLottoRank({
        lotto,
        winningNumbers,
        bonusNumber,
      });

      // then
      expect(rank).toBe(5);
    });
  });

  describe("calculateLottoRanks", () => {
    test("당첨 번호와 일치하는 번호의 개수 + 보너스 번호의 포함 여부에 따라 올바른 등수 통계를 반환해야 한다.", () => {
      // given
      const lottos = [new Lotto([1, 2, 3, 4, 5, 6])];
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 7;

      // when
      const rank = LottoRankCalculator.calculateLottoRanks({
        lottos,
        winningNumbers,
        bonusNumber,
      });

      // then
      expect(rank).toEqual({ 1: 1, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
    });
  });
});
