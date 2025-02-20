import { LOTTO_CONDITION, RANKING } from '../src/constants/constants';
import { calculateWinningRate } from '../src/domain/calculateWinningRate';

describe('수익률 판별 테스트', () => {
  test.each([
    [
      LOTTO_CONDITION.PRICE * 5,
      RANKING.FIRST.PRIZE,
      (RANKING.FIRST.PRIZE/ (LOTTO_CONDITION.PRICE * 5)) * 100,
    ],
    [
      LOTTO_CONDITION.PRICE * 5,
      RANKING.SECOND.PRIZE,
      (RANKING.SECOND.PRIZE / (LOTTO_CONDITION.PRICE * 5)) * 100,
    ],
  ])('수익률이 올바르게 계산 됐는지 판단', (price, prize, winningRate) => {
    expect(calculateWinningRate(price, prize)).toBe(winningRate);
  });
});
