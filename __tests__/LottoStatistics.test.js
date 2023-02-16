const Lotto = require('../src/domain/Lotto');
const LottoStatistics = require('../src/domain/LottoStatistics');
const WinningNumbers = require('../src/domain/WinningNumbers');
const BonusNumber = require('../src/domain/BonusNumber');

test('보너스 번호와 당첨 번호에 중복이 존재하지 않으면 정상 동작', () => {
  expect(() => {
    new LottoStatistics(
      new WinningNumbers('1,2,3,4,5,6'),
      new BonusNumber('7')
    );
  }).not.toThrow();
});

test('보너스 번호와 당첨 번호에 중복이 존재하면 예외처리', () => {
  expect(() => {
    new LottoStatistics(
      new WinningNumbers('1,2,3,4,5,6'),
      new BonusNumber('6')
    );
  }).toThrow();
});

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

test('총 수익률을 계산한다.', () => {
  const statistics = new LottoStatistics(
    new WinningNumbers('1,2,3,4,5,6'),
    new BonusNumber('7')
  );
  const winningLottos = statistics.determineAllLottosRank([
    new Lotto([1, 2, 3, 40, 41, 42]),
  ]);

  expect(statistics.calculateProfitRate(winningLottos, 8000)).toBe('62.5');
});
