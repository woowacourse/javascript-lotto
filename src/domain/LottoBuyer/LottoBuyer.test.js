import LottoBuyer from './LottoBuyer.js';

describe('로또 구입 기능 테스트', () => {
  // given
  const TEST_CASES = [
    {
      buyLottoPrice: 3000,
      expectedLottoCount: 3000 / LottoBuyer.LOTTO_PRICE_PER_UNIT,
    },
    {
      buyLottoPrice: 5000,
      expectedLottoCount: 5000 / LottoBuyer.LOTTO_PRICE_PER_UNIT,
    },
  ];

  test.each(TEST_CASES)(
    '구입금액이 $buyLottoPrice원 일 때, 로또 발행이 $expectedLottoCount번 되어야 한다.',
    ({ buyLottoPrice, expectedLottoCount }) => {
      const lottoBuyer = new LottoBuyer(buyLottoPrice);

      // when
      const lottoNumbers = lottoBuyer.purchase();

      // then
      expect(lottoNumbers.length).toBe(expectedLottoCount);
    },
  );
});
