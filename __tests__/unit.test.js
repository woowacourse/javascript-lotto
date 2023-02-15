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
  const lottoNumbers = [1, 2, 3, 4, 5, 6];

  test.each([
    [[1, 2, 3, 4, 5, 6], 7, 1],
    [[1, 2, 3, 4, 5, 44], 6, 2],
    [[1, 2, 3, 4, 5, 44], 45, 3],
    [[1, 2, 3, 4, 43, 44], 45, 4],
    [[1, 2, 3, 42, 43, 44], 45, 5],
  ])(
    '당첨 번호가 %p이고 보너스 번호가 %d일 때 %d등 이다.',
    (winningNumbers, bonusNumber, expectedRanking) => {
      const ranking = new Lotto(lottoNumbers).calculateRanking(winningNumbers, bonusNumber);

      expect(ranking).toBe(expectedRanking);
    }
  );
});

describe('계산 기능', () => {
  test.each([
    [[1], 2000000000],
    [[2], 30000000],
    [[3], 1500000],
    [[4], 50000],
    [[5], 5000],
    [[3, 5, 5], 1510000],
  ])('순위가 각각 %p등일 때, 총 상금은 %d원이다.', (rankings, expectedReward) => {
    const reward = new LottoMachine().calculateReward(rankings);

    expect(reward).toBe(expectedReward);
  });
});
