import { calculateRevenue } from '../src/domain/calculateRevenue.js';

describe('로또 수익률 계산 테스트', () => {
  let purchasePrice;

  beforeEach(() => {
    purchasePrice = 1000;
  });
  test('로또 당첨 개수가 6개인 경우 수익률 ', () => {
    const matchCounts = [0, 0, 0, 0, 0, 0, 1, 0];

    const expectedResult = Number(((2000000000 / purchasePrice) * 100).toFixed(1));
    const revenue = calculateRevenue(matchCounts, purchasePrice);

    expect(revenue).toBe(expectedResult);
  });

  test('로또 당첨 개수가 5.5개인 경우 수익률', () => {
    const matchCounts = [0, 0, 0, 0, 0, 0, 0, 1];

    const expectedResult = Number(((30000000 / purchasePrice) * 100).toFixed(1));
    const revenue = calculateRevenue(matchCounts, purchasePrice);

    expect(revenue).toBe(expectedResult);
  });

  test('로또 당첨 개수가 5개인 경우 수익률', () => {
    const matchCounts = [0, 0, 0, 0, 0, 1, 0, 0];

    const expectedResult = Number(((1500000 / purchasePrice) * 100).toFixed(1));
    const revenue = calculateRevenue(matchCounts, purchasePrice);
    expect(revenue).toBe(expectedResult);
  });
});
