import generateRandomNumber from '../src/generateRandomNumber';
import Lotto from '../src/models/Lotto';
import LottoMachine from '../src/models/LottoMachine';

describe('로또를 뽑는 기능', () => {
  test('랜덤한 숫자가 1 이상 45 이하이다.', () => {
    const min = 1;
    const max = 45;

    const number = generateRandomNumber(min, max);

    expect(number).toBeGreaterThanOrEqual(min);
    expect(number).toBeLessThanOrEqual(max);
  });

  test('중복되지 않는 숫자가 6개이다.', () => {
    const lottoMachine = new LottoMachine();
    const lottoNumbers = lottoMachine.makeLottoNumbers();

    expect(new Set(lottoNumbers).size).toBe(6);
  });

  test('6개의 숫자가 오름차순으로 정렬되어있다.', () => {
    const lottoMachine = new LottoMachine();
    const lottoNumbers = lottoMachine.makeLottoNumbers();

    lottoNumbers.reduce((acc, cur) => {
      expect(acc).toBeLessThan(cur);
      return cur;
    }, 0);
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
    const reward = new LottoMachine().calculateReward(rankings);

    expect(reward).toBe(expectedReward);
  });
});
