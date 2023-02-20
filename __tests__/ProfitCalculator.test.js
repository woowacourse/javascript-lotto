const ProfitCalculator = require('../src/domain/ProfitCaculator');

describe('ProfitCalculator 메서드 테스트', () => {
  test('전체 당첨 금액의 합을 구한다.', () => {
    //given
    const ranking = { FIFTH: 2, FOURTH: 0, THIRD: 0, SECOND: 0, FIRST: 1 };
    const profitCalculator = new ProfitCalculator(ranking);

    //when
    const winningAmount = profitCalculator.getWinningAmount();

    //then
    expect(winningAmount).toEqual(2_000_010_000);
  });

  test('전체 당첨 금액과 구입 금액으로 수익률을 계산한다.', () => {
    //given
    const ranking = { FIFTH: 2, FOURTH: 0, THIRD: 0, SECOND: 0, FIRST: 1 };
    const profitCalculator = new ProfitCalculator(ranking);
    const money = 10_000;

    //when
    const profitRate = profitCalculator.getProfitRate(money);

    //then
    expect(profitRate).toEqual(20_000_100);
  });
});
