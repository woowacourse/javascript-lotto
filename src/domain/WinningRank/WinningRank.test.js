import WinningRank from './WinningRank.js';

describe('당첨 등수 계산 테스트', () => {
  // given
  const TEST_WINNING_NUMBER = [1, 2, 3, 4, 5, 6];
  const TEST_BONUS_NUMBER = 7;
  const TEST_CASES = [
    {
      lottoNumbersArray: [[1, 2, 3, 4, 5, 6]],
      expectedWinningRank: {
        '1st': 1,
        '2nd': 0,
        '3rd': 0,
        '4th': 0,
        '5th': 0,
      },
    },
    {
      lottoNumbersArray: [[1, 2, 3, 4, 5, 7]],
      expectedWinningRank: {
        '1st': 0,
        '2nd': 1,
        '3rd': 0,
        '4th': 0,
        '5th': 0,
      },
    },
    {
      lottoNumbersArray: [[1, 2, 3, 4, 5, 8]],
      expectedWinningRank: {
        '1st': 0,
        '2nd': 0,
        '3rd': 1,
        '4th': 0,
        '5th': 0,
      },
    },
    {
      lottoNumbersArray: [[1, 2, 3, 4, 11, 22]],
      expectedWinningRank: {
        '1st': 0,
        '2nd': 0,
        '3rd': 0,
        '4th': 1,
        '5th': 0,
      },
    },
    {
      lottoNumbersArray: [[1, 2, 3, 10, 20, 30]],
      expectedWinningRank: {
        '1st': 0,
        '2nd': 0,
        '3rd': 0,
        '4th': 0,
        '5th': 1,
      },
    },
  ];
  test.each(TEST_CASES)(
    '예상 등수는 $expectedWinningRank와 같아야 한다.',
    ({ lottoNumbersArray, expectedWinningRank }) => {
      const winningRank = new WinningRank({
        lottoNumbersArray,
        winningNumbers: TEST_WINNING_NUMBER,
        bonusNumber: TEST_BONUS_NUMBER,
      });

      // when
      const winningRankDetail = winningRank.calculateRank();

      // then
      expect(winningRankDetail).toStrictEqual(expectedWinningRank);
    },
  );
});
