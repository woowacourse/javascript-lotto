import WinningStatistics from "../src/domains/WinningStatistics.js";

describe("WinningStatistics 클래스 테스트: 당첨 내역 통계 및 수익률 계산", () => {
  // given
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;

  test.each([
    {
      description: "발행된 로또가 당첨 번호 중 2개와 일치하는 경우",
      lottos: [[1, 2, 7, 8, 9, 10]],
      expectedStatistics: new Map([
        [3, { count: 0, amount: 5000 }],
        [4, { count: 0, amount: 50_000 }],
        [5, { count: 0, amount: 1_500_000 }],
        [5.5, { count: 0, amount: 30_000_000 }],
        [6, { count: 0, amount: 2_000_000_000 }],
      ]),
    },
    {
      description: "발행된 로또가 당첨 번호 중 5개와 일치하는 경우",
      lottos: [[1, 2, 3, 4, 5, 10]],
      expectedStatistics: new Map([
        [3, { count: 0, amount: 5000 }],
        [4, { count: 0, amount: 50_000 }],
        [5, { count: 1, amount: 1_500_000 }],
        [5.5, { count: 0, amount: 30_000_000 }],
        [6, { count: 0, amount: 2_000_000_000 }],
      ]),
    },
    {
      description:
        "발행된 로또가 당첨 번호 중 5개 + 보너스 번호와 일치하는 경우",
      lottos: [[1, 2, 3, 4, 5, 7]],
      expectedStatistics: new Map([
        [3, { count: 0, amount: 5000 }],
        [4, { count: 0, amount: 50_000 }],
        [5, { count: 0, amount: 1_500_000 }],
        [5.5, { count: 1, amount: 30_000_000 }],
        [6, { count: 0, amount: 2_000_000_000 }],
      ]),
    },
    {
      description: "모든 발행된 로또들이 모두 낙첨되는 경우",
      lottos: [
        [7, 8, 9, 10, 11, 12], // 0개 일치
        [1, 7, 8, 9, 10, 11], // 1개 일치
        [1, 2, 7, 8, 9, 10], // 2개 일치
      ],
      expectedStatistics: new Map([
        [3, { count: 0, amount: 5000 }],
        [4, { count: 0, amount: 50_000 }],
        [5, { count: 0, amount: 1_500_000 }],
        [5.5, { count: 0, amount: 30_000_000 }],
        [6, { count: 0, amount: 2_000_000_000 }],
      ]),
    },
    {
      description: "모든 발행된 로또들이 당첨 번호 중 6개 모두 당첨되는 경우",
      lottos: [
        [1, 2, 3, 7, 8, 9], // 3개 일치
        [1, 2, 3, 4, 7, 8], // 4개 일치
        [1, 2, 3, 4, 5, 6], // 6개 일치
      ],
      expectedStatistics: new Map([
        [3, { count: 1, amount: 5000 }],
        [4, { count: 1, amount: 50_000 }],
        [5, { count: 0, amount: 1_500_000 }],
        [5.5, { count: 0, amount: 30_000_000 }],
        [6, { count: 1, amount: 2_000_000_000 }],
      ]),
    },
  ])(
    "calculateWinningResults 메서드 테스트: $description",
    ({ lottos, expectedStatistics }) => {
      // when
      const winningStatistics = new WinningStatistics();
      winningStatistics.calculateWinningResults(
        lottos,
        winningNumbers,
        bonusNumber,
      );

      // then
      expect(winningStatistics.statistics).toEqual(expectedStatistics);
    },
  );

  // 3개 일치 (5,000원) - 1개
  // 4개 일치 (50,000원) - 0개
  // 5개 일치 (1,500,000원) - 0개
  // 5개 일치, 보너스 볼 일치 (30,000,000원) - 0개
  // 6개 일치 (2,000,000,000원) - 0개

  test.each([
    {
      lottos: [
        [1, 2, 3, 7, 8, 9], // 3개 일치
        [1, 2, 3, 4, 7, 8], // 4개 일치
        [1, 2, 3, 4, 5, 6], // 6개 일치
      ],
      expectedProfitRatio: "66668500.0",
    },
    {
      lottos: [
        [7, 8, 9, 10, 11, 12], // 0개 일치
        [13, 14, 15, 16, 17, 18], // 0개 일치
      ],
      expectedProfitRatio: "0.0",
    },
    {
      lottos: [
        [1, 2, 3, 10, 11, 12], // 3개 일치
        [31, 32, 33, 34, 35, 36], // 0개 일치
        [31, 32, 33, 34, 35, 36], // 0개 일치
        [31, 32, 33, 34, 35, 36], // 0개 일치
        [31, 32, 33, 34, 35, 36], // 0개 일치
        [31, 32, 33, 34, 35, 36], // 0개 일치
        [31, 32, 33, 34, 35, 36], // 0개 일치
        [31, 32, 33, 34, 35, 36], // 0개 일치
      ],
      expectedProfitRatio: "62.5",
    },
  ])(
    "calculateProfitRatio 메서드 테스트: 당첨 내역에 따라 수익률이 정확히 계산되는지 확인한다.",
    ({ lottos, expectedProfitRatio }) => {
      // given
      const purchaseAmount = lottos.length * 1_000;

      // when
      const winningStatistics = new WinningStatistics();
      winningStatistics.calculateWinningResults(
        lottos,
        winningNumbers,
        bonusNumber,
      );
      const profitRatio =
        winningStatistics.calculateProfitRatio(purchaseAmount);

      // then
      expect(profitRatio).toEqual(expectedProfitRatio);
    },
  );
});
