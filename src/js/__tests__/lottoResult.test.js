import LottoVendor from '../model/LottoVendor';
import LottoResult from '../model/LottoResult';

describe('당첨 결과를 확인할 수 있어야 한다.', () => {
  // given
  const lottoVendor = new LottoVendor();
  lottoVendor.lottos = [
    { numbers: [2, 1, 3, 4, 5, 6] },
    { numbers: [1, 2, 3, 24, 25, 17] },
    { numbers: [7, 1, 3, 2, 4, 5] },
    { numbers: [7, 1, 3, 2, 4, 5] },
    { numbers: [5, 1, 2, 3, 4, 8] },
    { numbers: [4, 3, 2, 1, 9, 15] },
  ];

  const lottoResult = new LottoResult(lottoVendor);
  lottoResult.winningNumbers = [1, 2, 3, 4, 5, 6];
  lottoResult.bonusNumber = 7;

  test('당첨번호와 구입한 로또 번호를 비교하여 당첨 금액별 당첨 번호 개수를 계산할 수 있어야 한다.', () => {
    // when
    lottoResult.calculateWinningCounts();

    // then
    expect(lottoResult.winningCounts).toStrictEqual({
      fifthPlace: 1,
      fourthPlace: 1,
      thirdPlace: 1,
      secondPlace: 2,
      firstPlace: 1,
    });
  });

  test('구입 금액과 당첨된 금액을 비교하여 수익률을 계산할 수 있어야 한다.', () => {
    // given
    lottoVendor.paidMoney = 1000000;

    // when
    lottoResult.calculateLottoYield();

    // then
    expect(lottoResult.lottoYield).toBe(206155);
  });
});
