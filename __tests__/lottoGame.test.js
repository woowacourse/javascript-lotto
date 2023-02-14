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

test('반환된 개수를 토대로 수익률을 계산한다.', () => {
  // give
  // when
  // then
});
