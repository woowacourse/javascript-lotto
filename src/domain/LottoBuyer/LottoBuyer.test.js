describe('로또 구입 기능 테스트', () => {
  const TEST_CASES = [
    {
      buyLottoPrice: 3000,
      expectedLottoCount: 3,
    },
    {
      buyLottoPrice: 5000,
      expectedLottoCount: 5,
    },
  ];

  test.each(TEST_CASES)(
    '구입금액이 $buyLottoPrice원 일 때, 로또 발행이 $expectedLottoCount번 되어야 한다.',
    ({ buyLottoPrice, expectedLottoCount }) => {
      const lottoBuyer = new LottoBuyer();
      const lottoNumbers = lottoBuyer.purchase(buyLottoPrice);

      expect(lottoNumbers.length).toBe(expectedLottoCount);
    },
  );
});
