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
    const formattedLottoNumbers = FORMAT_MESSAGE.lottoNumbersToString(lottoNumbers);

    // then
    expect(formattedLottoNumbers).toMatch(expectedMessage);
  });
});
