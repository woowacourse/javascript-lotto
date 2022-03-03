describe('수익률을 계산할 수 있어야한다.', () => {
  const WINNING_AMOUNT_OF_LOTTO = {
    3: 5000,
    4: 50000,
    5: 1500000,
    7: 30000000,
    6: 2000000000,
  };

  const calculateRateOfReturn = (buyCount, matchResult) => {
    const profits = matchResult.reduce(
      (acc, [matchCount, lottoCount]) => acc + WINNING_AMOUNT_OF_LOTTO[matchCount] * lottoCount,
      0,
    );
    return (profits / (buyCount * 1000)) * 100;
  };

  const matchResult = [
    [3, 1],
    [4, 1],
    [5, 0],
    [7, 0],
    [6, 0],
  ];

  test('로또를 1개를 샀을 때 5500%여야 한다.', () => {
    const buyCount = 1;

    expect(calculateRateOfReturn(buyCount, matchResult)).toBe(5500);
  });

  test('로또를 5개를 샀을 때 1100%여야 한다.', () => {
    const buyCount = 5;

    expect(calculateRateOfReturn(buyCount, matchResult)).toBe(1100);
  });
});
