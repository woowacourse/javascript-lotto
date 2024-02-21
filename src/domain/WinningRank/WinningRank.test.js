import WinningRank from './WinningRank.js';

describe('당첨 등수 계산 테스트', () => {
  // given
  const TEST_WINNING_NUMBER = [1, 2, 3, 4, 5, 6];
  const TEST_BONUS_NUMBER = 7;
  const TEST_CASES = [
    {
      lottoNumbers: [[1, 2, 3, 4, 5, 6]],
      expectedWinningRank: {
        1: 1,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
    },
    {
      lottoNumbers: [[1, 2, 3, 4, 5, 7]],
      expectedWinningRank: {
        1: 0,
        2: 1,
        3: 0,
        4: 0,
        5: 0,
      },
    },
    {
      lottoNumbers: [[1, 2, 3, 4, 5, 8]],
      expectedWinningRank: {
        1: 0,
        2: 0,
        3: 1,
        4: 0,
        5: 0,
      },
    },
    {
      lottoNumbers: [[1, 2, 3, 4, 11, 22]],
      expectedWinningRank: {
        1: 0,
        2: 0,
        3: 0,
        4: 1,
        5: 0,
      },
    },
    {
      lottoNumbers: [[1, 2, 3, 10, 20, 30]],
      expectedWinningRank: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 1,
      },
    },
  ];
  test.each(TEST_CASES)(
    '예상 등수는 $expectedWinningRank와 같아야 한다.',
    ({ lottoNumbers, expectedWinningRank }) => {
      const winningRank = new WinningRank({
        lottoNumbers,
        winningNumber: TEST_WINNING_NUMBER,
        bonusNumber: TEST_BONUS_NUMBER,
      });

      // when
      const winningRankDetail = winningRank.calculateRank();

      // then
      expect(winningRankDetail).toStrictEqual(expectedWinningRank);
    },
  );
});
