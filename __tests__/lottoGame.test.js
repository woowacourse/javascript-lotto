import LottoGame from '../src/domain/LottoGame';

test('당첨된 로또 상금을 계산한다.', () => {
  // given
  const ranks = [3, 4, 0, 0, 0, 0, 0, 0];
  const lottoGame = new LottoGame();

  // when
  const totalAmount = lottoGame.calculateTotalPrize(ranks);

  //then
  expect(totalAmount).toBe(1550000);
});

test('로또 상금과 구매 금액을 토대로 수익률을 계산한다.', () => {
  // given
  const price = 8000;
  const ranks = [3, 4, 0, 0, 0, 0, 0, 0];
  const lottoGame = new LottoGame();
  const totalAmount = lottoGame.calculateTotalPrize(ranks);

  // when
  const earningRate = lottoGame.calculateEarningRate(price, totalAmount);

  // then
  expect(earningRate).toBe('19375.0');
});
