import LottoStatistics from '../src/LottoStatistics';

const result = {
  '3개 일치': { count: 0, price: 5000 },
  '4개 일치': { count: 1, price: 50000 },
  '5개 일치': { count: 0, price: 1500000 },
  '5개 일치, 보너스 볼 일치': { count: 0, price: 30000000 },
  '6개 일치': { count: 0, price: 2000000000 },
};

test('사용자가 구매한 로또 번호와 당첨 번호의 일치 개수를 반환한다', () => {
  const machineLotto = [1, 2, 3, 4, 5, 6];
  const winningLotto = [1, 2, 3, 33, 34, 45];

  const lottoStatistics = new LottoStatistics();
  expect(lottoStatistics.matchSameCount(machineLotto, winningLotto)).toBe(3);
});
