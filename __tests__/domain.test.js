import lottoCalculator from '../src/domain/lottoCalculator';
import Lotto from '../src/domain/models/Lotto';

describe('Lotto 모델 테스트', () => {
  const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

  test.each([
    [[1, 2, 3, 4, 5, 6], 6],
    [[1, 2, 3, 4, 5, 44], 5],
    [[1, 2, 3, 4, 43, 44], 4],
    [[1, 2, 3, 42, 43, 44], 3],
    [[39, 40, 41, 42, 43, 44], 0],
  ])('당첨 번호가 %p일 때 일치하는 숫자는 %d개이다.', (winningNumbers, expectedMatchCount) => {
    const matchCount = lotto.calculateMatchCount(winningNumbers);

    expect(matchCount).toBe(expectedMatchCount);
  });

  test.each([
    [6, 7, 1],
    [5, 6, 2],
    [5, 7, 3],
    [4, 7, 4],
    [3, 7, 5],
  ])(
    '일치하는 당첨 번호가 %d개이고 보너스 번호가 %d일 때 %d등이다.',
    (matchCount, bonusNumber, expectedRanking) => {
      const ranking = lotto.calculateRanking(matchCount, bonusNumber);

      expect(ranking).toBe(expectedRanking);
    }
  );

  test('일치하는 당첨 번호가 2개 일 때 함수를 실행하면 에러를 던진다.', () => {
    const matchCount = 2;
    const bonusNumber = 1;

    expect(() => {
      lotto.calculateRanking(matchCount, bonusNumber);
    }).toThrow();
  });
});

describe('lottoCalculator 테스트', () => {
  test.each([
    [[1], 2000000000],
    [[2], 30000000],
    [[3], 1500000],
    [[4], 50000],
    [[5], 5000],
    [[3, 5, 5], 1510000],
    [[], 0],
  ])('순위가 각각 %p등일 때, 총 상금은 %d원이다.', (rankings, expectedReward) => {
    const reward = lottoCalculator.calculateReward(rankings);

    expect(reward).toBe(expectedReward);
  });

  test.each([
    [8000, [5], '62.5%'],
    [10000, [1, 5, 5], '20,000,100.0%'],
    [1000, [1], '200,000,000.0%'],
    [200000, [], '0.0%'],
    [50000, [4, 5], '110.0%'],
  ])(
    '구입금액이 %d이고, 순위가 각각 %p등일 때 수익률은 %f이다.',
    (lottePurchaseAmount, rankings, expectedRewardRate) => {
      const rewardRate = lottoCalculator.calculateRewardRate(lottePurchaseAmount, rankings);

      expect(rewardRate).toBe(expectedRewardRate);
    }
  );
});
