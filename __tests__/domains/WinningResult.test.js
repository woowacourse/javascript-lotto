import Lotto from '../../src/domains/Lotto';
import WinningResult from '../../src/domains/WinningResult';

describe('당첨 결과 테스트', () => {
  describe('정상 케이스', () => {
    const lottos = [
      new Lotto([1, 2, 3, 4, 5, 6]), // 1등
      new Lotto([1, 2, 3, 4, 5, 7]), // 2등 (보너스 번호 포함)
      new Lotto([1, 2, 3, 4, 5, 8]), // 3등
      new Lotto([1, 2, 3, 4, 8, 9]), // 4등
      new Lotto([1, 2, 3, 10, 11, 12]), // 5등
      new Lotto([1, 2, 13, 14, 15, 16]), // 미당첨
      new Lotto([1, 17, 18, 19, 20, 21]), // 미당첨
    ];

    const winningLotto = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const winningResult = new WinningResult(winningLotto, bonusNumber);
    const result = winningResult.calculate(lottos);

    test.each([
      ['1등 당첨 개수', 1, 0],
      ['2등 당첨 개수', 1, 1],
      ['3등 당첨 개수', 1, 2],
      ['4등 당첨 개수', 1, 3],
      ['5등 당첨 개수', 1, 4],
    ])('%s는 %s개이다.', (_, expectedCount, rank) => {
      expect(result[rank]).toBe(expectedCount);
    });

    test('사용자가 구입한 로또 번호와 당첨 번호를 비교하여 총 수익률을 계산할 수 있다.', () => {
      const lottoPurchasePrice = 10000;
      const expectedResult = [1, 1, 1, 1, 1];
      const profitRate = winningResult.calculateProfitRate(
        lottoPurchasePrice,
        expectedResult,
      );

      expect(profitRate).toBe(20315450);
    });
  });
});
