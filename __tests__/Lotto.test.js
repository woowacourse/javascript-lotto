const { profitByRank } = require('../src/constants/constants');
const Lotto = require('../src/domain/model/Lotto');
const { calculateProfit } = require('../src/utils');

describe('Lotto 클래스 테스트', () => {
  const INPUT_LOTTO_NUMBERS = [
    [8, 21, 23, 41, 42, 43],
    [3, 5, 11, 16, 32, 38],
    [7, 11, 16, 35, 36, 44],
    [1, 8, 11, 31, 41, 42],
  ];

  const INPUT_LOTTO_NUMBERS_PER_RANK = [
    [
      { lottoNumbers: [1, 2, 3, 4, 5, 6], expectedRank: 1 },
      { lottoNumbers: [1, 2, 3, 4, 5, 7], expectedRank: 2 },
      { lottoNumbers: [1, 2, 3, 4, 5, 8], expectedRank: 3 },
      { lottoNumbers: [1, 2, 3, 4, 8, 9], expectedRank: 4 },
      { lottoNumbers: [1, 2, 3, 8, 9, 10], expectedRank: 5 },
      { lottoNumbers: [8, 9, 10, 11, 12, 13], expectedRank: undefined },
    ],
  ];

  const INPUT_LOTTO_NUMBERS_PER_PROFIT = [
    { lottoNumbers: [1, 2, 3, 4, 5, 6], expectedProfit: profitByRank[0] },
    { lottoNumbers: [1, 2, 3, 4, 5, 7], expectedProfit: profitByRank[1] },
    { lottoNumbers: [1, 2, 3, 4, 5, 8], expectedProfit: profitByRank[2] },
    { lottoNumbers: [1, 2, 3, 4, 8, 9], expectedProfit: profitByRank[3] },
    { lottoNumbers: [1, 2, 3, 8, 9, 10], expectedProfit: profitByRank[4] },
    { lottoNumbers: [8, 9, 10, 11, 12, 13], expectedProfit: 0 },
  ];

  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;

  test.each(INPUT_LOTTO_NUMBERS)(
    '주어진 당첨 번호로 해당 값을 필드로 갖는 Lotto 인스턴스를 생성해야 한다.',
    (lottoNumbers) => {
      const lotto = new Lotto(lottoNumbers);

      expect(lottoNumbers).toEqual(lotto.getNumbers());
    }
  );

  test.each(INPUT_LOTTO_NUMBERS_PER_RANK)(
    '주어진 당첨 번호와 보너스 번호로 로또 번호와 비교하여 등수를 계산하여 반환해야 한다.',
    ({ lottoNumbers, expectedRank }) => {
      const lotto = new Lotto(lottoNumbers);

      lotto.calculateRank(winningNumbers, bonusNumber);

      expect(lotto.getRank()).toEqual(expectedRank);
    }
  );

  test.each(INPUT_LOTTO_NUMBERS_PER_PROFIT)(
    '주어진 당첨 번호와 보너스 번호로 로또 번호와 비교하여 수익을 계산하여 반환해야 한다.',
    ({ lottoNumbers, expectedProfit }) => {
      const lotto = new Lotto(lottoNumbers);

      lotto.calculateRank(winningNumbers, bonusNumber);

      const profit = calculateProfit(lotto.getRank());

      expect(profit).toBe(expectedProfit);
    }
  );
});
