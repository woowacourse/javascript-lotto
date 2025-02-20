import LottoStatistics from '../src/LottoStatistics';

let lottoStatistics;
beforeEach(() => {
  lottoStatistics = new LottoStatistics();
});

test('사용자가 구매한 로또 번호와 당첨 번호의 일치 개수를 반환한다', () => {
  const machineLotto = [1, 2, 3, 4, 5, 6];
  const winningLotto = [1, 2, 3, 33, 34, 45];

  expect(lottoStatistics.matchSameCount(machineLotto, winningLotto)).toBe(3);
});

test('사용자가 구매한 로또 번호와 당첨된 번호가 5개 일치하고 보너스 번호도 일치할 경우, 해당 복권의 숫자를 +1 증가시킨다.', () => {
  const sameCount = 5;
  const isBonusNumber = true;  
  lottoStatistics.determineRank(sameCount, isBonusNumber);

  expect(lottoStatistics.getRankResult()[`${sameCount}개 일치, 보너스 볼 일치`].count).toBe(1);
});

test.each([
  [3], [4], [6], [5],
])('사용자가 구매한 로또 번호와 당첨된 번호가 %s개 일치하면 해당 복권의 숫자를 +1 증가시킨다.', (sameCount) => {
  lottoStatistics.determineRank(sameCount,false);

  expect(lottoStatistics.getRankResult()[`${sameCount}개 일치`].count).toBe(1);
});

describe('사용자가 구매한 로또 번호와 보너스 번호를 비교한 후 참/거짓 값을 반환한다.', () => {
  const machineLotto = [1, 2, 3, 4, 5, 6];

  test('참을 값을 반환한다.', () => {
    const bonus = 6;
    expect(lottoStatistics.hasBonusNumber(machineLotto, bonus)).toBeTruthy();
  });

  test('거짓을 값을 반환한다.', () => {
    const bonus = 7;
    expect(lottoStatistics.hasBonusNumber(machineLotto, bonus)).toBe(false);
  });
});

test('사용자가 구매한 로또 번호화 당첨 번호를 비교하여 수익률을 구한다.', () => {
  const  profit = 5000;
  const investmentCost = 8000;
  expect(lottoStatistics.calculateRevenueRate(profit, investmentCost)).toBe(62.5);
});
