import { WinningLotto } from '../src/domains';
import Lotto from '../src/domains/Lotto';

describe('WinningLotto 기능 테스트', () => {
  test.each([
    {
      comparedLottoNumbers: [1, 2, 3, 9, 8, 10],
      result: { isBonus: false, matchedCount: 3 },
    },
    {
      comparedLottoNumbers: [1, 2, 3, 9, 8, 7],
      result: { isBonus: true, matchedCount: 3 },
    },
  ])(
    'compareLotto - 추첨 로또와 당첨 로또의 비교 결과를 반환한다.',
    ({ comparedLottoNumbers, result }) => {
      // given
      const WINNING_LOTTO_NUMBERS = new Lotto([1, 2, 3, 4, 5, 6]);
      const BONUS_NUMBER_INPUT = '7';

      // when
      const winningLotto = new WinningLotto(
        WINNING_LOTTO_NUMBERS,
        BONUS_NUMBER_INPUT,
      );

      // then
      expect(winningLotto.compareLotto(comparedLottoNumbers)).toEqual(result);
    },
  );
});
