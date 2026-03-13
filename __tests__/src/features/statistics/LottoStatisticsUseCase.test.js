import WinningNumber from "../../../../src/domain/WinningNumber.js";
import LottoStatisticsUseCase from "../../../../src/features/statistics/LottoStatisticsUseCase.js";

describe("LottoStatisticsUseCase", () => {
  test("로또 배열 없으면 에러", () => {
    const winningNumber = new WinningNumber([1, 2, 3, 4, 5, 6], 7);

    expect(() =>
      LottoStatisticsUseCase.statisticsLottos([], winningNumber),
    ).toThrow(LottoStatisticsUseCase.ERROR.ARRAY_EMPTY);
  });

  test("5등 1개 당첨 통계", () => {
    const lottosNumbers = [[1, 2, 3, 10, 11, 12]];
    const winningNumber = new WinningNumber([1, 2, 3, 4, 5, 6], 7);

    const { lottosResult, totalPrize } =
      LottoStatisticsUseCase.statisticsLottos(lottosNumbers, winningNumber);

    const fifth = lottosResult.find(
      ({ winningCondition, bonusCondition }) =>
        winningCondition === 3 && !bonusCondition,
    );

    const expected = {
      prize: 5000,
      order: 5,
      winningCondition: 3,
      bonusCondition: false,
      count: 1,
    };

    expect(fifth).toMatchObject(expected);
    expect(totalPrize).toBe(5000);
  });
});
