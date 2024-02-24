import LottoResult from "../src/domain/LottoResult";

describe("LottoResult 유닛 테스트", () => {
  test("rank가 나온 횟수를 카운트한다.", () => {
    //Arrange

    const rankCounts = [10, 10, 10, 10, 10, 10];
    const lottoResult = new LottoResult();

    //Act
    rankCounts.forEach((count, rank) => {
      Array.from({ length: count }).forEach(() => lottoResult.countRank(rank));
    });

    //Assert
    expect(lottoResult.getRanks()).toEqual(rankCounts);
  });

  test.each([
    [[1], (LottoResult.PRIZE_OF_LOTTO[1] / 1000) * 100],
    [[0], 0],
    [[0, 1], (LottoResult.PRIZE_OF_LOTTO[1] / (1000 * 2)) * 100],
  ])("수익률을 계산한다.", (ranks, expected) => {
    //Arrange
    const lottoResult = new LottoResult();
    ranks.forEach((rank) => lottoResult.countRank(rank));

    //Act
    const profitRate = lottoResult.getProfitRate();

    //Assert
    expect(profitRate).toBe(expected);
  });
});
