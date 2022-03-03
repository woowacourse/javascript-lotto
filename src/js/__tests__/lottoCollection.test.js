describe('수익률을 계산할 수 있어야한다.', () => {
  const calculateRateOfReturn = (buyCount, profits) => (profits / (buyCount * 1000)) * 100;

  test('로또를 1개 사고, 수익금이 5,000이면, 500%여야 한다.', () => {
    const buyCount = 1;
    const profits = 5000;

    expect(calculateRateOfReturn(buyCount, profits)).toBe(500);
  });

  test('로또를 5개 사고, 수익금이 2,000,000,000라면 40000000%여야 한다.', () => {
    const buyCount = 5;
    const profits = 2000000000;

    expect(calculateRateOfReturn(buyCount, profits)).toBe(40000000);
  });
});
