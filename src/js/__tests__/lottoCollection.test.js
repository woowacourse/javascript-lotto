import ReturnOfCalculator from '../CalculatorImpl/RateOfReturnCalculator.js';

describe('수익률을 계산할 수 있어야한다.', () => {
  const matchResult = [
    [3, 1],
    [4, 1],
    [5, 0],
    [7, 0],
    [6, 0],
  ];

  test('로또를 1개를 샀을 때 5500%여야 한다.', () => {
    const buyCount = 1;

    expect(new ReturnOfCalculator(buyCount, matchResult).execute()).toBe(5500);
  });

  test('로또를 5개를 샀을 때 1100%여야 한다.', () => {
    const buyCount = 5;

    expect(new ReturnOfCalculator(buyCount, matchResult).execute()).toBe(1100);
  });
});
