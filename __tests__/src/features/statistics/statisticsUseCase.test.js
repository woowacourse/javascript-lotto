import StatisticsUseCase from "../../../../src/features/statistics/StatisticsUseCase.js";

describe("LottoStatisticsUseCase", () => {
  const useCase = new StatisticsUseCase();

  test("로또 배열 없으면 에러", () => {
    expect(() =>
      useCase.statisticsLottos({
        lottosRaw: [],
        winningNumbersRaw: [1, 2, 3, 4, 5, 6],
        bonusNumberRaw: 7,
        purchasedRaw: 1000,
      }),
    ).toThrow(StatisticsUseCase.ERROR.ARRAY_EMPTY);
  });

  test("5등 1개 당첨 통계", () => {
    const statisticsDto = useCase.statisticsLottos({
      lottosRaw: [[1, 2, 3, 10, 11, 12]],
      winningNumbersRaw: [1, 2, 3, 4, 5, 6],
      bonusNumberRaw: 7,
      purchasedRaw: 1000,
    });

    const { lottosResult, profitRate } = statisticsDto;

    const fifth = lottosResult.find(
      ({ matchCount, hasBonus }) => matchCount === 3 && !hasBonus,
    );

    expect(fifth).toMatchObject({
      prize: 5000,
      order: 5,
      matchCount: 3,
      hasBonus: false,
      count: 1,
    });
    expect(profitRate).toBe(500.0);
  });
});
