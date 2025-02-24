import { LOTTO_CONDITION, RANKING } from '../../src/constants/constants.js';
import { calculateWinningRate } from '../../src/domain/calculateWinningRate.js';

describe('calculateWinningRate 함수 테스트', () => {
  test.each([
    [LOTTO_CONDITION.PRICE * 5, RANKING.FIRST.PRIZE, (RANKING.FIRST.PRIZE / (LOTTO_CONDITION.PRICE * 5)) * 100],
    [LOTTO_CONDITION.PRICE * 5, RANKING.SECOND.PRIZE, (RANKING.SECOND.PRIZE / (LOTTO_CONDITION.PRICE * 5)) * 100],
  ])('구입 금액 %i원과 당첨금 %i원에 대한 수익률이 %f%%인지 확인한다', (price, prize, winningRate) => {
    expect(calculateWinningRate(price, prize)).toBe(winningRate);
  });
});
