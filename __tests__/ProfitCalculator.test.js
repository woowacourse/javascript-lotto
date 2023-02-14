const ProfitCalculator = require('../src/domain/ProfitCaculator');

test('전체 당첨 금액의 합을 구한다.', () => {
  //given
  const ranking = { 1: 1, 2: 0, 3: 0, 4: 0, 5: 2 };

  //when
  const profitCalculator = new ProfitCalculator(ranking);
  const winningAmount = profitCalculator.getWinningAmount();

  //then
  expect(winningAmount).toEqual(2_000_010_000);
});
