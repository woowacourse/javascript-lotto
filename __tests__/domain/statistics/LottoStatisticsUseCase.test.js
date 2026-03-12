import LottoStatisticsUseCase from "../../../src/lotto/statistics/LottoStatisticsUseCase.js";
import Lotto from "../../../src/lotto/shared/domain/Lotto.js";
import WinningNumber from "../../../src/lotto/shared/domain/WinningNumber.js";

describe("LottoStatisticsUseCase", () => {
  const useCase = new LottoStatisticsUseCase();

  test("로또 배열 없으면 에러", () => {
    const winningNumber = new WinningNumber([1, 2, 3, 4, 5, 6], 7);
    expect(() => useCase.statisticsLottos([], winningNumber)).toThrow(
      LottoStatisticsUseCase.ERROR.ARRAY_EMPTY,
    );
  });

  test("5등 1개 당첨 통계", () => {
    const lottos = [new Lotto([1, 2, 3, 10, 11, 12])];
    const winningNumber = new WinningNumber([1, 2, 3, 4, 5, 6], 7);
    const { lottosResult, totalPrize } = useCase.statisticsLottos(
      lottos,
      winningNumber,
    );
    const fifth = lottosResult.find(({ order }) => order === 5);

    const equal = {
      prize: 5000,
      order: 5,
      winningCondition: 3,
      bonusCondition: false,
      count: 1,
    };
    expect(fifth).toEqual(equal);
    expect(totalPrize).toEqual(5000);
  });
});
