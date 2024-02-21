import RateOfReturnCalculator from './RateOfReturnCalculator';

describe('수익률 계산 테스트', () => {
  // given
  const TEST_CASE = [
    {
      buyLottoPrice: 3_000,
      winningRankDetail: { '1st': 1, '2nd': 0, '3rd': 0, '4th': 0, '5th': 0 },
      expectedRateOfReturn: '66666666.7',
    },
    {
      buyLottoPrice: 9_000,
      winningRankDetail: { '1st': 0, '2nd': 1, '3rd': 0, '4th': 0, '5th': 0 },
      expectedRateOfReturn: '333333.3',
    },
    {
      buyLottoPrice: 8_000,
      winningRankDetail: { '1st': 0, '2nd': 0, '3rd': 1, '4th': 0, '5th': 0 },
      expectedRateOfReturn: '18750.0',
    },
    {
      buyLottoPrice: 3_000,
      winningRankDetail: { '1st': 0, '2nd': 0, '3rd': 0, '4th': 1, '5th': 0 },
      expectedRateOfReturn: '1666.7',
    },
    {
      buyLottoPrice: 1_000,
      winningRankDetail: { '1st': 0, '2nd': 0, '3rd': 0, '4th': 0, '5th': 1 },
      expectedRateOfReturn: '500.0',
    },
  ];

  test.each(TEST_CASE)(
    '로또 구매 금액이 $buyLottoPrice원 이고 등수 정보가 $winningRankDetail일 때 수익률은 $expectedRateOfReturn% 이다.',
    ({ buyLottoPrice, winningRankDetail, expectedRateOfReturn }) => {
      const rateOfReturnCalculator = new RateOfReturnCalculator({
        buyLottoPrice,
        winningRankDetail,
      });

      // when
      const rateOfReturn = rateOfReturnCalculator.execute();

      // then
      expect(rateOfReturn).toMatch(expectedRateOfReturn);
    },
  );
});
