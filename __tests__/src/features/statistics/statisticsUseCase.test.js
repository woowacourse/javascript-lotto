import Lotto from "../../../../src/domain/Lotto.js";
import WinningNumber from "../../../../src/domain/WinningNumber.js";
import Money from "../../../../src/domain/Money.js";
import StatisticsUseCase from "../../../../src/features/statistics/statisticsUseCase.js";

describe("LottoStatisticsUseCase", () => {
  const useCase = new StatisticsUseCase();

  test("로또 배열 없으면 에러", () => {
    const winningNumber = new WinningNumber([1, 2, 3, 4, 5, 6], 7);
    const purchasedMoney = new Money(1000);

    expect(() =>
      useCase.statisticsLottos({ lottos: [], winningNumber, purchasedMoney }),
    ).toThrow(StatisticsUseCase.ERROR.ARRAY_EMPTY);
  });

  test("5등 1개 당첨 통계", () => {
    const lottos = [new Lotto([1, 2, 3, 10, 11, 12])];
    const winningNumber = new WinningNumber([1, 2, 3, 4, 5, 6], 7);
    const purchasedMoney = new Money(1000); // 3. Money 객체 추가

    const statisticsDto = useCase.statisticsLottos({
      lottos,
      winningNumber,
      purchasedMoney,
    });

    const lottosResult = statisticsDto.lottosResult;
    const profitRate = statisticsDto.profitRate;

    const fifth = lottosResult.find(
      ({ matchCount, hasBonus }) => matchCount === 3 && !hasBonus,
    );

    const expected = {
      prize: 5000,
      order: 5,
      matchCount: 3,
      hasBonus: false,
      count: 1,
    };

    expect(fifth).toMatchObject(expected);
    expect(profitRate).toBe(500.0);
  });
});
