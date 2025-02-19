import WinningStatistics from "../src/domains/WinningStatistics.js";

describe("발행된 로또들의 당첨 내역을 계산해서 통계내는 클래스 테스트", () => {
  // given
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;

  test.each([
    {
      description: "발행된 로또가 당첨 번호 중 2개와 일치하는 경우",
      lottos: [[1, 2, 7, 8, 9, 10]],
      expectedStatistics: new Map([
        [3, 0],
        [4, 0],
        [5, 0],
        [5.5, 0],
        [6, 0],
      ]),
    },
    {
      description: "발행된 로또가 당첨 번호 중 5개와 일치하는 경우",
      lottos: [[1, 2, 3, 4, 5, 10]],
      expectedStatistics: new Map([
        [3, 0],
        [4, 0],
        [5, 1],
        [5.5, 0],
        [6, 0],
      ]),
    },
    {
      description:
        "발행된 로또가 당첨 번호 중 5개 + 보너스 번호와 일치하는 경우",
      lottos: [[1, 2, 3, 4, 5, 7]],
      expectedStatistics: new Map([
        [3, 0],
        [4, 0],
        [5, 0],
        [5.5, 1],
        [6, 0],
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
        [3, 0],
        [4, 0],
        [5, 0],
        [5.5, 0],
        [6, 0],
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
        [3, 1],
        [4, 1],
        [5, 0],
        [5.5, 0],
        [6, 1],
      ]),
    },
  ])("$description", ({ lottos, expectedStatistics }) => {
    // when
    const winningStatistics = new WinningStatistics();
    winningStatistics.calculateWinningResults(
      lottos,
      winningNumbers,
      bonusNumber,
    );

    // then
    expect(winningStatistics.statistics).toEqual(expectedStatistics);
  });
});
