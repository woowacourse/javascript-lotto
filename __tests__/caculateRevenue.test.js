import { LOTTO_SYSTEM } from '../src/constants/LottoSystem.js';
import { calculateRevenue, calculateRevenueByMatch } from '../src/domain/calculateRevenue.js';

describe('로또 1개 샀을 때, 수익률 계산 테스트', () => {
  let purchasePrice;

  beforeEach(() => {
    purchasePrice = 1000;
  });
  test('당첨 번호 일치 개수가 6개이면 수익률은 200000000% 여야 한다.', () => {
    const matchCounts = [0, 0, 0, 0, 0, 0, 1, 0];

    const expectedResult = Number(((2000000000 / purchasePrice) * 100).toFixed(1));
    const revenue = calculateRevenue(matchCounts, purchasePrice);

    expect(revenue).toBe(expectedResult);
  });

  test('당첨 번호 일치 개수가 5개이고 보너스 번호가 일치한 경우 수익률은 3000000%여야 한다.', () => {
    const matchCounts = [0, 0, 0, 0, 0, 0, 0, 1];

    const expectedResult = Number(((30000000 / purchasePrice) * 100).toFixed(1));
    const revenue = calculateRevenue(matchCounts, purchasePrice);

    expect(revenue).toBe(expectedResult);
  });

  test('당첨 번호 일치 개수가 5개인 경우 수익률은 150000%여야 한다.', () => {
    const matchCounts = [0, 0, 0, 0, 0, 1, 0, 0];

    const expectedResult = Number(((1500000 / purchasePrice) * 100).toFixed(1));
    const revenue = calculateRevenue(matchCounts, purchasePrice);
    expect(revenue).toBe(expectedResult);
  });

  test('당첨 번호 일치 개수가 4개인 경우 수익률은 5000%여야 한다.', () => {
    const matchCounts = [0, 0, 0, 0, 0, 1, 0, 0];

    const expectedResult = Number(((1500000 / purchasePrice) * 100).toFixed(1));
    const revenue = calculateRevenue(matchCounts, purchasePrice);
    expect(revenue).toBe(expectedResult);
  });

  test('당첨 번호 일치 개수가 3개인 경우 수익률은 500%여야 한다.', () => {
    const matchCounts = [0, 0, 0, 0, 0, 1, 0, 0];

    const expectedResult = Number(((1500000 / purchasePrice) * 100).toFixed(1));
    const revenue = calculateRevenue(matchCounts, purchasePrice);
    expect(revenue).toBe(expectedResult);
  });
});

describe('calculateRevenueByMatch', () => {
  test.each([
    [6, 2000000000],
    [5, 1500000],
    [4, 50000],
    [3, 5000],
    [0, 0],
  ])('당첨 번호 일치 개수가 %i개이면, 상금은 %i원이여야 한다.', (matchCount, expectedPrize) => {
    expect(calculateRevenueByMatch(matchCount)).toBe(expectedPrize);
  });

  test('당첨 번호 일치 개수가 5개이고, 보너스 번호가 일치하면, 상금은 30000000원이여야 한다.', () => {
    expect(calculateRevenueByMatch(LOTTO_SYSTEM.FIVE_WITH_BONUS_MATCH_IDX)).toBe(30000000);
  });
});
