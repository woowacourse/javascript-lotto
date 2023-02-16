const Lotto = require('../src/domain/Lotto');
const LottoStatistics = require('../src/domain/LottoStatistics');
const WinningNumbers = require('../src/domain/WinningNumbers');
const BonusNumber = require('../src/domain/BonusNumber');

test('각 로또의 등수를 결정한다.', () => {
  const statistics = new LottoStatistics(
    new WinningNumbers('1,2,3,4,5,6'),
    new BonusNumber('7')
  );

  const rank = statistics.determineLottoRank(new Lotto([1, 2, 3, 4, 5, 6]));

  expect(rank).toBe(1);
});

test('모든 로또의 당첨 결과를 배열로 반환한다.', () => {
  const statistics = new LottoStatistics(
    new WinningNumbers('1,2,3,4,5,6'),
    new BonusNumber('7')
  );

  const result = statistics.determineAllLottosRank([
    new Lotto([1, 2, 3, 4, 5, 6]),
    new Lotto([1, 2, 3, 4, 5, 7]),
  ]);

  expect(result).toEqual([1, 1, 0, 0, 0, 0]);
});
