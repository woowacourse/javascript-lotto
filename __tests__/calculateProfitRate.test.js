const calculateProfitRate = require('../src/domain/calculateProfitRate');

test('전체 당첨 금액과 구입 갯수로 수익률을 계산한다.', () => {
  // given
  const ranking = { FIFTH: 2, FOURTH: 0, THIRD: 0, SECOND: 0, FIRST: 1 };
  const lottoQuantity = 10;

  // when
  const profitRate = calculateProfitRate(ranking, lottoQuantity);

  // then
  expect(profitRate).toEqual(20_000_100);
});
