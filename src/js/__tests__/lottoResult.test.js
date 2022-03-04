import lottoStatisticMachine from '../models/lottoStatisticMachine.js';

describe('구매한 로또 번호와 지난주 당첨 번호, 보너스 번호를 이용해서 당첨 결과를 확인할 수 있어야 한다.', () => {
  test('구매한 로또 중 당첨된 로또를 개수를 등수 별로 계산할 수 있어야 한다.', () => {
    const lottos = [
      [7, 15, 30, 37, 39, 44],
      [7, 15, 30, 37, 39, 18],
      [7, 15, 30, 37, 39, 45],
      [7, 15, 30, 37, 40, 45],
    ];
    const winningNumbers = [7, 15, 30, 37, 39, 44];
    const bonusNumber = 18;

    const winningCounts = lottoStatisticMachine.calculateWinningCounts(
      lottos,
      winningNumbers,
      bonusNumber,
    );

    expect(winningCounts).toEqual([0, 1, 1, 1, 1]);
  });

  test('구매한 로또에 대한 수익률을 계산할 수 있어야 한다.', () => {
    const fare = 5000;
    const winningCounts = [0, 0, 1, 0, 0];

    const earningsRate = lottoStatisticMachine.calculateEarningsRate(fare, winningCounts);

    expect(earningsRate).toBe(29900);
  });
});
