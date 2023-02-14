const ProfitCalculator = require('../src/domain/ProfitCaculator');

describe('', () => {
  //given
  const ranking = { 1: 1, 2: 0, 3: 0, 4: 0, 5: 2 };
  const profitCalculator = new ProfitCalculator(ranking);

  test('전체 당첨 금액의 합을 구한다.', () => {
    //when
    const winningAmount = profitCalculator.getWinningAmount();

    //then
    expect(winningAmount).toEqual(2_000_010_000);
  });

  test('전체 당첨 금액과 구입 금액으로 수익률을 계산한다.', () => {
    //given
    const money = 10_000;

    //when
    const profitRate = profitCalculator.getProfitRate(money);

    //then
    expect(profitRate).toEqual(20_000_100);
  });
});
