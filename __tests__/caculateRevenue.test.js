import { calculateRevenue } from '../src/domain/calculateRevenue.js';

describe('로또 구입금액이 1000원일 때, 로또 수익률 계산 테스트', () => {
  let purchasePrice;

  beforeEach(() => {
    purchasePrice = 1000;
  });
  test('로또 당첨 개수가 6개인 경우, 상금은 2,000,000,000이므로 수익률은 2,000,000,000/1000*100 이다.', () => {
    const matchCounts = [0, 0, 0, 0, 0, 0, 1, 0];

    const expectedResult = Number(((2_000_000_000 / purchasePrice) * 100).toFixed(1));
    const revenue = calculateRevenue(matchCounts, purchasePrice);

    expect(revenue).toBe(expectedResult);
  });

  test('로또 당첨 개수가 5개 + 보너스 번호인 경우, 상금은 30,000,000이므로 수익률은 30,000,000/1000*100 이다.', () => {
    const matchCounts = [0, 0, 0, 0, 0, 0, 0, 1];

    const expectedResult = Number(((30_000_000 / purchasePrice) * 100).toFixed(1));
    const revenue = calculateRevenue(matchCounts, purchasePrice);

    expect(revenue).toBe(expectedResult);
  });

  test('로또 당첨 개수가 5개인 경우, 상금은 1,500,000이므로 수익률은 1,500,000/1000*100 이다.', () => {
    const matchCounts = [0, 0, 0, 0, 0, 1, 0, 0];

    const expectedResult = Number(((1_500_000 / purchasePrice) * 100).toFixed(1));
    const revenue = calculateRevenue(matchCounts, purchasePrice);
    expect(revenue).toBe(expectedResult);
  });
});
