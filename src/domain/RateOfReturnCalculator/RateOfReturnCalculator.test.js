describe('수익률 계산 테스트', () => {
  // given
  const TEST_CASE = [
    {
      buyLottoPrice: 3000,
      winningRankDetail: { 1: 1, 2: 0, 3: 0, 4: 0, 5: 0 },
      expectedRateOfReturn: 66666666.7,
    },
    {
      buyLottoPrice: 9000,
      winningRankDetail: { 1: 0, 2: 1, 3: 0, 4: 0, 5: 0 },
      expectedRateOfReturn: 333333.3,
    },
    {
      buyLottoPrice: 8000,
      winningRankDetail: { 1: 0, 2: 0, 3: 1, 4: 0, 5: 0 },
      expectedRateOfReturn: 18750.0,
    },
    {
      buyLottoPrice: 3000,
      winningRankDetail: { 1: 0, 2: 0, 3: 0, 4: 1, 5: 0 },
      expectedRateOfReturn: 16666.7,
    },
    {
      buyLottoPrice: 1000,
      winningRankDetail: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 1 },
      expectedRateOfReturn: 500.0,
    },
  ];

  test.each(TEST_CASE)(
    '로또 구매 금액이 $buyLottoPrice이고 등수 정보가 $winningRankDetail일 때 수익률은 $expectedRateOfReturn% 이다.',
    ({ buyLottoPrice, winningRankDetail, expectedRateOfReturn }) => {
      const rateOfReturnCalculator = new RateOfReturnCalculator({
        buyLottoPrice,
        winningRankDetail,
      });

      // when
      const rateOfReturn = rateOfReturnCalculator.execute();

      // then
      expect(rateOfReturn).toBeCloseTo(expectedRateOfReturn, 1);
    },
  );
});
