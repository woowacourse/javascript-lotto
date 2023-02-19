const Lotto = require('../src/domain/Lotto');
const LottoStatistics = require('../src/domain/LottoStatistics');
const WinningNumbers = require('../src/domain/WinningNumbers');
const BonusNumber = require('../src/domain/BonusNumber');

describe('LottoStatistics 클래스 테스트', () => {
  test('로또 당첨결과가 모두 일치할 때 1등인지 확인한다.', () => {
    const winningNumbers = new WinningNumbers('1,2,3,4,5,6');
    const bonusNumber = new BonusNumber('7', winningNumbers);
    const statistics = new LottoStatistics(winningNumbers, bonusNumber);

    const rank = statistics.determineLottoRank(new Lotto([1, 2, 3, 4, 5, 6]));

    expect(rank).toBe(1);
  });

  test('로또 당첨결과가 5개 일치하고 보너스 번호가 일치할 때 2등인지 확인한다.', () => {
    const winningNumbers = new WinningNumbers('1,2,3,4,5,45');
    const bonusNumber = new BonusNumber('6', winningNumbers);
    const statistics = new LottoStatistics(winningNumbers, bonusNumber);

    const rank = statistics.determineLottoRank(new Lotto([1, 2, 3, 4, 5, 6]));

    expect(rank).toBe(2);
  });

  test('로또 당첨결과가 5개 일치하고 보너스 번호가 일치하지 않을 때 3등인지 확인한다.', () => {
    const winningNumbers = new WinningNumbers('1,2,3,4,5,45');
    const bonusNumber = new BonusNumber('44', winningNumbers);
    const statistics = new LottoStatistics(winningNumbers, bonusNumber);

    const rank = statistics.determineLottoRank(new Lotto([1, 2, 3, 4, 5, 6]));

    expect(rank).toBe(3);
  });

  test('로또 당첨결과가 4개 일치하고 4등인지 확인한다.', () => {
    const winningNumbers = new WinningNumbers('1,2,3,4,44,45');
    const bonusNumber = new BonusNumber('33', winningNumbers);
    const statistics = new LottoStatistics(winningNumbers, bonusNumber);

    const rank = statistics.determineLottoRank(new Lotto([1, 2, 3, 4, 5, 6]));

    expect(rank).toBe(4);
  });

  test('로또 당첨결과가 3개 일치하고 5등인지 확인한다.', () => {
    const winningNumbers = new WinningNumbers('1,2,3,43,44,45');
    const bonusNumber = new BonusNumber('33', winningNumbers);
    const statistics = new LottoStatistics(winningNumbers, bonusNumber);

    const rank = statistics.determineLottoRank(new Lotto([1, 2, 3, 4, 5, 6]));

    expect(rank).toBe(5);
  });

  test('로또 당첨 결과가 아무것도 없을 때 6등인지 확인한다.', () => {
    const winningNumbers = new WinningNumbers('1,2,42,43,44,45');
    const bonusNumber = new BonusNumber('33', winningNumbers);
    const statistics = new LottoStatistics(winningNumbers, bonusNumber);

    const rank = statistics.determineLottoRank(new Lotto([1, 2, 3, 4, 5, 6]));

    expect(rank).toBe(6);
  });

  test('모든 로또의 당첨 결과를 배열로 반환한다.', () => {
    const winningNumbers = new WinningNumbers('1,2,3,4,5,6');
    const bonusNumber = new BonusNumber('7', winningNumbers);

    const statistics = new LottoStatistics(winningNumbers, bonusNumber);

    const result = statistics.determineAllLottosRank([
      new Lotto([1, 2, 3, 4, 5, 6]),
      new Lotto([1, 2, 3, 4, 5, 7]),
      new Lotto([1, 2, 3, 4, 5, 8]),
      new Lotto([1, 2, 3, 4, 44, 45]),
      new Lotto([1, 2, 3, 43, 44, 45]),
      new Lotto([1, 2, 42, 43, 44, 45]),
    ]);

    expect(result).toEqual([1, 1, 1, 1, 1, 1]);
  });

  test('총 수익률을 계산한다.', () => {
    const winningNumbers = new WinningNumbers('1,2,3,4,5,6');
    const bonusNumber = new BonusNumber('7', winningNumbers);

    const statistics = new LottoStatistics(winningNumbers, bonusNumber);

    const winningLottos = statistics.determineAllLottosRank([
      new Lotto([1, 2, 3, 40, 41, 42]),
    ]);

    expect(statistics.calculateProfitRate(winningLottos, 8000)).toBe('62.5');
  });
});
