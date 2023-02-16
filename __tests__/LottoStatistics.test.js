const BonusNumber = require('../src/domain/BonusNumber');
const Lotto = require('../src/domain/Lotto');
const LottoStatistics = require('../src/domain/LottoStatistics');
const WinningNumbers = require('../src/domain/WinningNumbers');

test('각 로또의 등수를 결정한다.', () => {
  const statistics = new LottoStatistics(
    new WinningNumbers('1,2,3,4,5,6'),
    new BonusNumber('7')
  );

  const rank = statistics.determineLottoRank(new Lotto([1, 2, 3, 4, 5, 6]));

  expect(rank).toBe(1);
});
