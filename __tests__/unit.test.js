import generateRandomNumber from '../src/generateRandomNumber';
import lottoCalculator from '../src/LottoCalculator';
import Lotto from '../src/models/Lotto';
import validator from '../src/validator';

describe('로또를 뽑는 기능', () => {
  test('랜덤한 숫자가 1 이상 45 이하이다.', () => {
    const min = 1;
    const max = 45;

    const number = generateRandomNumber(min, max);

    expect(number).toBeGreaterThanOrEqual(min);
    expect(number).toBeLessThanOrEqual(max);
  });
});

describe('로또 당첨 기능', () => {
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

describe('계산 기능', () => {
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

describe('검증하는 기능', () => {
  test.each([[' '], ['a'], ['-1'], [' 1'], ['1 '], ['1.0'], ['01']])(
    '입력값이 %s일 때 에러를 던진다.',
    (input) => {
      expect(() => {
        validator.checkDigit(input);
      }).toThrow();
    }
  );

  test('숫자가 min 미만일 때 에러를 던진다.', () => {
    const number = 0;
    const min = 1;

    expect(() => {
      validator.checkGreaterThanOrEqualMin(number, min);
    }).toThrow();
  });

  test('숫자가 max 초과일 때 에러를 던진다.', () => {
    const number = 46;
    const max = 45;

    expect(() => {
      validator.checkLessThanOrEqualMax(number, max);
    }).toThrow();
  });

  test('숫자가 unit에 나누어 떨어지지 않을 때 에러를 던진다.', () => {
    const number = 1001;
    const unit = 1000;

    expect(() => {
      validator.checkDivideIntoUnit(number, unit);
    }).toThrow();
  });

  test('배열에 중복이 있을 때 에러를 던진다', () => {
    const array = [1, 1, 2, 3, 4, 5];

    expect(() => {
      validator.checkDuplication(array);
    }).toThrow();
  });

  test('배열의 길이가 length가 아니면 에러를 던진다.', () => {
    const array = [1, 2, 3, 4, 5];
    const length = 6;

    expect(() => {
      validator.checkArrayLength(array, length);
    }).toThrow();
  });
});
