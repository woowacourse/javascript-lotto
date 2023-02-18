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
