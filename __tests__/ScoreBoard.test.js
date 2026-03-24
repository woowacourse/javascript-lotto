import { RANK } from "../src/constants";
import Lotto from "../src/Model/Lotto";
import ScoreBoard from "../src/ScoreBoard";
import WinningLotto from "../src/Model/WinningLotto";

describe("스코어보드 테스트", () => {
  test.each([
    [RANK.FIRST.DISPLAY, RANK.FIRST.MATCH_COUNT, true],
    [RANK.SECOND.DISPLAY, RANK.SECOND.MATCH_COUNT, true],
    [RANK.THIRD.DISPLAY, RANK.THIRD.MATCH_COUNT, false],
    [RANK.FOURTH.DISPLAY, RANK.FOURTH.MATCH_COUNT, true],
    [RANK.FIFTH.DISPLAY, RANK.FIFTH.MATCH_COUNT, true],
  ])(
    "일치하는 번호 개수와 보너스 번호의 개수를 확인해 올바르게 등수를 계산해야 한다.(%s)",
    (expectedRank, matchCount, hasBonus) => {
      // when
      const rank = ScoreBoard.getRank(matchCount, hasBonus);
      // then
      expect(rank).toEqual(expectedRank);
    },
  );

  test("구매한 모든 로또의 등수를 계산해 반환해야 한다 ", () => {
    // given
    const lottos = [
      new Lotto([1, 2, 3, 4, 5, 6]),
      new Lotto([2, 3, 4, 5, 6, 7]),
    ];
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);

    // when
    const allRankCount = ScoreBoard.makeAllRankCount(lottos, winningLotto);

    // then
    expect(allRankCount).toEqual({
      FIRST: 1,
      SECOND: 1,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 0,
      NONE: 0,
    });
  });

  test("올바른 수익률을 계산해야 한다.", () => {
    // given
    const money = 5_000;
    const result = 40_631_100;
    const allRankCount = {
      FIRST: 1,
      SECOND: 1,
      THIRD: 1,
      FOURTH: 1,
      FIFTH: 1,
    };

    // when
    const profitRate = ScoreBoard.getProfitRate(allRankCount, money);

    // then
    expect(profitRate).toEqual(result.toFixed(1));
  });
});
