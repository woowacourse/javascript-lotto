import LottoGame from '../src/domain/LottoGame';
import { divideBByARate } from '../src/utils/Utils';
test('당첨된 로또 상금을 계산한다.', () => {
  // given
  const ranks = [
    'THIRD',
    'FOURTH',
    'NONE',
    'NONE',
    'NONE',
    'NONE',
    'NONE',
    'NONE',
  ];
  const lottoGame = new LottoGame();

  // when
  const totalAmount = lottoGame.calculateTotalPrize(ranks);

  //then
  expect(totalAmount).toBe(1550000);
});

test('로또 상금과 구매 금액을 토대로 수익률을 계산한다.', () => {
  // given
  const price = 8000;
  const ranks = [
    'THIRD',
    'FOURTH',
    'NONE',
    'NONE',
    'NONE',
    'NONE',
    'NONE',
    'NONE',
  ];
  const lottoGame = new LottoGame();
  const totalAmount = lottoGame.calculateTotalPrize(ranks);

  // when
  const earningRate = divideBByARate(price, totalAmount);

  // then
  expect(earningRate).toBe('19375.0');
});
