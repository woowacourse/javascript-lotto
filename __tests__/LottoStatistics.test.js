import LottoStatistics from '../src/LottoStatistics';

test('사용자가 구매한 로또 번호와 당첨 번호의 일치 개수를 반환한다', () => {
  const machineLotto = [1, 2, 3, 4, 5, 6];
  const winningLotto = [1, 2, 3, 33, 34, 45];

  const lottoStatistics = new LottoStatistics();
  expect(lottoStatistics.matchSameCount(machineLotto, winningLotto)).toBe(3);
});

test.each([
  [3], [4], [6],
])('사용자가 구매한 로또 번호와 당첨된 번호가 %s개 일치하면 해당 복권의 숫자를 +1 증가시킨다.', (sameCount) => {
  const lottoStatistics = new LottoStatistics();
  lottoStatistics.increaseCount(sameCount);

  expect(lottoStatistics.getRankResult()[`${sameCount}개 일치`].count).toBe(1);
});
