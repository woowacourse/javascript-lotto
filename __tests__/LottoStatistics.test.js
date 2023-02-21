const Lotto = require('../src/domain/Lotto');
const LottoStatistics = require('../src/domain/LottoStatistics');

describe('LottoStatistics 클래스 테스트', () => {
  test.each([
    [[1, 2, 3, 4, 5, 6], 7, 1],
    [[1, 2, 3, 4, 5, 45], 6, 2],
    [[1, 2, 3, 4, 5, 45], 44, 3],
    [[1, 2, 3, 4, 44, 45], 33, 4],
    [[1, 2, 3, 43, 44, 45], 33, 5],
    [[1, 2, 42, 43, 44, 45], 33, 6],
  ])(
    '로또 번호 : [1, 2, 3, 4, 5, 6] / 당첨 번호 : %p, 보너스 번호 : %d 인 경우 %d등을 반환한다.',
    (winningNumbers, bonusNumber, expected) => {
      const statistics = new LottoStatistics(winningNumbers, bonusNumber);

      const rank = statistics.determineLottoRank(new Lotto([1, 2, 3, 4, 5, 6]));

      expect(rank).toBe(expected);
    }
  );

  test.each([
    [6, 1],
    [4, 4],
    [3, 5],
  ])(
    '당첨 번호와 로또 번호가 %d개 일치하는 경우 %d등을 반환한다.',
    (matchCount, expected) => {
      const statistics = new LottoStatistics([1, 2, 3, 4, 5, 6], 7);

      const rank = statistics.getLottoRank(
        new Lotto([1, 2, 3, 4, 5, 6]),
        matchCount
      );

      expect(rank).toBe(expected);
    }
  );

  test.each([
    [5, 7, 2],
    [5, 8, 3],
  ])(
    '당첨 번호가 %d개 일치하면 보너스 번호(%d)의 일치 여부에 따라 %d등을 반환한다.',
    (matchCount, bonusNumber, expected) => {
      const statistics = new LottoStatistics([1, 2, 3, 4, 5, 6], bonusNumber);

      const rank = statistics.getLottoRank(
        new Lotto([1, 2, 3, 4, 5, 7]),
        matchCount
      );

      expect(rank).toBe(expected);
    }
  );

  test('모든 로또의 당첨 결과를 배열로 반환한다.', () => {
    const statistics = new LottoStatistics([1, 2, 3, 4, 5, 6], 7);

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
    const statistics = new LottoStatistics([1, 2, 3, 4, 5, 6], 7);

    const winningLottos = statistics.determineAllLottosRank([
      new Lotto([1, 2, 3, 40, 41, 42]),
    ]);

    expect(statistics.calculateProfitRate(winningLottos, 8000)).toBe('62.5');
  });
});
