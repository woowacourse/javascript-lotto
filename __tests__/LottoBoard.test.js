import LottoBoard from "../src/domain/LottoBoard";

describe("WinningLotto에 대한 유닛 테스트", () => {
  const bonusNumber = 7;
  const notBonusNumber = notBonusNumber + 1;
  test.each([
    [[1, 2, 3, 4, 5, 6], 1],

    [[1, 2, 3, 4, 5, bonusNumber], 2],

    [[1, 2, 3, 4, 5, notBonusNumber], 3],

    [[1, 2, 3, 4, 45, bonusNumber], 4],
    [[1, 2, 3, 4, 45, notBonusNumber], 4],

    [[1, 2, 3, 44, 45, bonusNumber], 5],
    [[1, 2, 3, 44, 45, notBonusNumber], 5],

    [[1, 2, 43, 44, 45, bonusNumber], 0],
    [[1, 2, 43, 44, 45, notBonusNumber], 0],
  ])("배열을 입력받아 각 로또의 등수를 반환한다", (lotto, rank) => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const lottoBoard = new LottoBoard(winningNumbers, bonusNumber);

    expect(lottoBoard.getLottoRank(lotto)).toBe(rank);
  });
});
