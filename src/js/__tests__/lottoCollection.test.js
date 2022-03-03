import ReturnOfCalculator from '../CalculatorImpl/RateOfReturnCalculator.js';
import { MATCH_COUNT_OF_LOTTO_RANKING } from '../constant/index.js';

describe('수익률을 계산할 수 있어야한다.', () => {
  const matchResult = {
    [MATCH_COUNT_OF_LOTTO_RANKING.FIFHT]: 1,
    [MATCH_COUNT_OF_LOTTO_RANKING.FORUTH]: 1,
    [MATCH_COUNT_OF_LOTTO_RANKING.THRID]: 0,
    [MATCH_COUNT_OF_LOTTO_RANKING.SECOND]: 0,
    [MATCH_COUNT_OF_LOTTO_RANKING.FIRST]: 0,
  };

  test('로또를 1개를 샀을 때 5400%여야 한다.', () => {
    const buyCount = 1;

    expect(new ReturnOfCalculator(buyCount, matchResult).execute()).toBe(5400);
  });

  test('로또를 5개를 샀을 때 1000%여야 한다.', () => {
    const buyCount = 5;

    expect(new ReturnOfCalculator(buyCount, matchResult).execute()).toBe(1000);
  });
});
