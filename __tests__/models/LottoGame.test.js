import Lotto from "../../src/models/Lotto";
import LottoGame from "../../src/models/LottoGame";

describe("models/LottoGame", () => {
  test("당첨된 로또에 맞춰 총상금액과 총 당첨의 개수를 반환한다.", () => {
    //given
    const myLotto = [new Lotto([1, 2, 3, 4, 5, 6])];
    const result = { winningNumbers: [1, 2, 3, 4, 5, 7], bonusNumber: 6 };
    const lottoGame = new LottoGame();

    //when
    const { rankCount, totalReward } = lottoGame.playLotto(myLotto, result);

    //then
    expect(rankCount).toEqual([0, 0, 1, 0, 0, 0]);
    expect(totalReward).toBe(30_000_000);
  });

  test("매치된 숫자와 보너스 매치 여부에 따라 등수를 반환한다.", () => {
    const matchCount = 5;
    const isBonusMatched = false;

    const lottoGame = new LottoGame();

    expect(lottoGame.checkRank(matchCount, isBonusMatched)).toEqual({
      RANK: 3,
      REWARD: 1500000,
      WINNING_CRITERIA: 5,
    });
  });

  test("게임 결과에 따라 알맞은 총 상금의 합을 반환한다.", () => {
    const gameResults = [
      {
        RANK: 3,
        REWARD: 1_500_000,
        WINNING_CRITERIA: 5,
      },
      {
        RANK: 3,
        REWARD: 1_500_000,
        WINNING_CRITERIA: 5,
      },
    ];

    const lottoGame = new LottoGame();

    expect(lottoGame.calcTotalReward(gameResults)).toBe(3_000_000);
  });

  test("게임 결과에 따라 알맞은 랭킹 수를 반환한다.", () => {
    const gameResults = [
      {
        RANK: 3,
        REWARD: 1_500_000,
        WINNING_CRITERIA: 5,
      },
      {
        RANK: 3,
        REWARD: 1_500_000,
        WINNING_CRITERIA: 5,
      },
    ];

    const lottoGame = new LottoGame();

    expect(lottoGame.getRankCount(gameResults)).toEqual([0, 0, 0, 2, 0, 0]);
  });
});
