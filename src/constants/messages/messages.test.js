import { FORMAT_MESSAGE } from './messages.js';

describe('로또 메시지 포맷팅 테스트', () => {
  const LOTTO_COUNT_TEST_CASE = [
    {
      lottoCount: 3,
      expectedMessage: '3개를 구매했습니다.',
    },
    {
      lottoCount: 5,
      expectedMessage: '5개를 구매했습니다.',
    },
  ];
  test.each(LOTTO_COUNT_TEST_CASE)(
    '로또 구매 갯수가 $lottoCount일 때, 포맷된 메시지는 "$expectedMessage" 이다.',
    ({ lottoCount, expectedMessage }) => {
      // when
      const formattedLottoCounts = FORMAT_MESSAGE.lottoCountToString(lottoCount);

      // then
      expect(formattedLottoCounts).toMatch(expectedMessage);
    },
  );

  // given
  const LOTTO_NUMBER_TEST_CASES = [
    {
      description:
        'lottoNumbers가 [[1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12]] 일 때, 포맷된 메시지는 "[1, 2, 3, 4, 5, 6]\n[7, 8, 9, 10, 11, 12]" 이다.',
      lottoNumbers: [
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12],
      ],
      expectedMessage: '[1, 2, 3, 4, 5, 6]\n[7, 8, 9, 10, 11, 12]',
    },
    {
      description:
        'lottoNumbers가 [[11, 22, 33, 34, 44, 45], [5, 10, 15, 20, 25]] 일 때, 포맷된 메시지는 "[11, 22, 33, 34, 44, 45]\n[5, 10, 15, 20, 25]" 이다.',
      lottoNumbers: [
        [11, 22, 33, 34, 44, 45],
        [5, 10, 15, 20, 25],
      ],
      expectedMessage: '[11, 22, 33, 34, 44, 45]\n[5, 10, 15, 20, 25]',
    },
  ];

  test.each(LOTTO_NUMBER_TEST_CASES)('$description', ({ lottoNumbers, expectedMessage }) => {
    // when
    const formattedLottoNumbers = FORMAT_MESSAGE.lottoNumbersArrayToString(lottoNumbers);

    // then
    expect(formattedLottoNumbers).toMatch(expectedMessage);
  });

  // given
  const WINNING_STATISTICS_TEST_CASES = [
    {
      lottoRankResult: {
        '1st': 0,
        '2nd': 0,
        '3rd': 1,
        '4th': 0,
        '5th': 1,
      },
      expectedMessage: `3개 일치 (5,000원) - 1개
4개 일치 (50,000원) - 0개
5개 일치 (1,500,000원) - 1개
5개 일치, 보너스 볼 일치 (30,000,000원) - 0개
6개 일치 (2,000,000,000원) - 0개`,
    },
  ];

  test.each(WINNING_STATISTICS_TEST_CASES)(
    '로또 당첨 등수에 따라 올바른 결과를 출력해야 한다.',
    ({ lottoRankResult, expectedMessage }) => {
      // when
      const formattedWinningStatistics = FORMAT_MESSAGE.winningStatisticsToString(lottoRankResult);

      // then
      expect(formattedWinningStatistics).toMatch(expectedMessage);
    },
  );
});
