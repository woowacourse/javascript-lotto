import { LOTTO_MATCHING_RESULT_KEY } from '../utils/constants.js';

import LottoResultManager from '../model/lottoResultManager.js';

describe('lottoResultManager 클래스 내부 메서드(매칭 결과 확인) 테스트', () => {
  test('입력한 당첨번호와 구매한 로또의 매칭 결과를 비교할 수 있어야한다.', () => {
    const lottoResultManager = new LottoResultManager();

    const winningLottoNumbers = [1, 2, 3, 4, 5, 6];
    const winningLottoBonusNumber = 7;

    const lottoList = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 7],
      [19, 10, 20, 21, 9, 6],
    ];

    const lottoMatchingResult = lottoResultManager.calcLottoMatchingResult(
      winningLottoNumbers,
      winningLottoBonusNumber,
      lottoList
    );

    expect(lottoMatchingResult).toStrictEqual({
      [LOTTO_MATCHING_RESULT_KEY.THREE]: 0,
      [LOTTO_MATCHING_RESULT_KEY.FOUR]: 0,
      [LOTTO_MATCHING_RESULT_KEY.FIVE]: 0,
      [LOTTO_MATCHING_RESULT_KEY.FIVE_PLUS_BONUS]: 1,
      [LOTTO_MATCHING_RESULT_KEY.SIX]: 1,
      [LOTTO_MATCHING_RESULT_KEY.NOTHING]: 1,
    });
  });

  // test('로또 매칭 결과와 구매 금액을 가지고 수익률을 알아낼 수 있어야한다', () => {
  //   const lottoResultManager = new LottoResultManager();
  //   const purchaseMoney = 50000;

  //   // const matchResult = {
  //   //   [LOTTO_MATCHING_RESULT_KEY.THREE]: 0,
  //   //   [LOTTO_MATCHING_RESULT_KEY.FOUR]: 0,555
  //   //   [LOTTO_MATCHING_RESULT_KEY.FIVE]: 0,
  //   //   [LOTTO_MATCHING_RESULT_KEY.FIVE_PLUS_BONUS]: 1,
  //   //   [LOTTO_MATCHING_RESULT_KEY.SIX]: 1,
  //   //   [LOTTO_MATCHING_RESULT_KEY.NOTHING]: 1,
  //   // };

  //   // 2030000000 / 50000;
  //   expect(lottoResultManager.calcProfit(purchaseMoney)).toBe(406);
  // });
});
