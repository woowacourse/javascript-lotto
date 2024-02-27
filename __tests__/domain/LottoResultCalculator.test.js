/* eslint-disable max-lines-per-function */
import Lotto from '../../src/domain/lotto.js';
import LottoResultCalculator from '../../src/domain/lottoResultCalculator.js';

describe('LottoResultCalculator 객체 테스트', () => {
  const WINNING_LOTTO = {
    winningLottoNumbers: [1, 2, 3, 4, 5, 6],
    bonusNumber: 7,
  };

  describe('구매한 로또들의 총 결과를 객체로 리턴한다.', () => {
    test.each([
      {
        lottoNumbers: [
          [1, 2, 3, 4, 5, 6], // 1등
          [1, 2, 3, 4, 5, 7], // 2등
        ],
        description: '1등 1개, 2등 1개',
        expectedResults: {
          FIFTH_PLACE: 0,
          FOURTH_PLACE: 0,
          THIRD_PLACE: 0,
          SECOND_PLACE: 1,
          FIRST_PLACE: 1,
        },
      },
      {
        lottoNumbers: [
          [1, 2, 3, 4, 5, 7], // 2등
          [1, 2, 3, 4, 5, 8], // 3등
        ],
        description: '2등 1개, 3등 1개',
        expectedResults: {
          FIFTH_PLACE: 0,
          FOURTH_PLACE: 0,
          THIRD_PLACE: 1,
          SECOND_PLACE: 1,
          FIRST_PLACE: 0,
        },
      },
      {
        lottoNumbers: [
          [1, 2, 3, 4, 5, 8], // 3등
          [1, 2, 3, 4, 8, 9], // 4등
          [1, 2, 3, 4, 8, 9], // 4등
        ],
        description: '3등 1개, 4등 2개',
        expectedResults: {
          FIFTH_PLACE: 0,
          FOURTH_PLACE: 2,
          THIRD_PLACE: 1,
          SECOND_PLACE: 0,
          FIRST_PLACE: 0,
        },
      },
      {
        lottoNumbers: [
          [1, 8, 9, 10, 11, 12], // 꽝
          [1, 8, 9, 10, 11, 12], // 꽝
          [1, 8, 9, 10, 11, 12], // 꽝
        ],
        description: '꽝 3개',
        expectedResults: {
          FIFTH_PLACE: 0,
          FOURTH_PLACE: 0,
          THIRD_PLACE: 0,
          SECOND_PLACE: 0,
          FIRST_PLACE: 0,
        },
      },
    ])('구매한 로또들의 총 결과는 $description이다.', ({ lottoNumbers, expectedResults }) => {
      const lottoList = lottoNumbers.map((lottoNumber) => new Lotto(lottoNumber));

      const lottoResult = new LottoResultCalculator({
        lottoList,
        winningLottoNumbers: WINNING_LOTTO.winningLottoNumbers,
        bonusNumber: WINNING_LOTTO.bonusNumber,
      }).getTotalResult();

      expect(lottoResult).toEqual(expectedResults);
    });
  });

  test('구매한 로또의 수익률을 계산한다.', () => {
    const LOTTO_LIST = [new Lotto([1, 2, 3, 11, 12, 13])];

    const profitResult = new LottoResultCalculator({
      lottoList: LOTTO_LIST,
      winningLottoNumbers: WINNING_LOTTO.winningLottoNumbers,
      bonusNumber: WINNING_LOTTO.bonusNumber,
    }).getProfit(LOTTO_LIST.length * 1000);

    expect(profitResult).toBe(500);
  });
});
