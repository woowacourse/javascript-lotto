import WinningLotto from '../src/domains/WinningLotto';

describe('WinningLotto 기능 테스트', () => {
  test.each([
    {
      lottoNumbers: [1, 2, 3, 9, 8, 10],
      result: { isBonus: false, matchedCount: 3 },
    },
    {
      lottoNumbers: [1, 2, 3, 9, 8, 7],
      result: { isBonus: true, matchedCount: 3 },
    },
  ])(
    '추첨 로또와 당첨 로또의 비교 결과를 반환한다.',
    ({ lottoNumbers, result }) => {
      const WINNING_LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];
      const BONUS_NUMBER = 7;

      const winningLotto = new WinningLotto(
        WINNING_LOTTO_NUMBERS,
        BONUS_NUMBER,
      );

      expect(winningLotto.compareLotto(lottoNumbers)).toEqual(result);
    },
  );
});
