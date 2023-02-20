const Lotto = require('../src/domain/Lotto');
const LottoStatistics = require('../src/domain/LottoStatistics');
const WinningNumbers = require('../src/domain/WinningNumbers');
const BonusNumber = require('../src/domain/BonusNumber');

describe('LottoStatistics 클래스 테스트', () => {
  test.each([
    ['1,2,3,4,5,6', '7', 1],
    ['1,2,3,4,5,45', '6', 2],
    ['1,2,3,4,5,45', '44', 3],
    ['1,2,3,4,44,45', '33', 4],
    ['1,2,3,43,44,45', '33', 5],
    ['1,2,42,43,44,45', '33', 6],
  ])(
    '각 로또의 등수를 결정한다.',
    (winningNumbersInput, bonusNumberInput, expected) => {
      const winningNumbers = new WinningNumbers(winningNumbersInput);
      const bonusNumber = new BonusNumber(bonusNumberInput, winningNumbers);
      const statistics = new LottoStatistics(winningNumbers, bonusNumber);

      const rank = statistics.determineLottoRank(new Lotto([1, 2, 3, 4, 5, 6]));

      expect(rank).toBe(expected);
    }
  );

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
