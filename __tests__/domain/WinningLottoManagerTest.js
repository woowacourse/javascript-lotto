import WinningLottoManager from "../../src/models/winningLottoManager.js";

describe("WinningLottoManager.compareWithWinningLotto", () => {
  test("6개 번호 일치하면 matchCount 6, hasBonus false", () => {
    const parsed = "1,2,3,4,5,6".split(",").map(Number);
    const manager = new WinningLottoManager(parsed);

    const result = manager.compareWithWinningLotto([1, 2, 3, 4, 5, 6]);
    expect(result).toEqual({ matchCount: 6, hasBonus: false });
  });

  test("5개 번호 일치 + 보너스 일치하면 matchCount 5, hasBonus true", () => {
    const parsed = "1,2,3,4,5,6".split(",").map(Number);
    const manager = new WinningLottoManager(parsed);
    manager.setBonusNumber("7");

    const result = manager.compareWithWinningLotto([1, 2, 3, 4, 5, 7]);
    expect(result).toEqual({ matchCount: 5, hasBonus: true });
  });

  test("3개 번호 일치하면 matchCount 3, hasBonus false", () => {
    const parsed = "1,2,3,4,5,6".split(",").map(Number);
    const manager = new WinningLottoManager(parsed);

    const result = manager.compareWithWinningLotto([1, 2, 3, 10, 11, 12]);
    expect(result).toEqual({ matchCount: 3, hasBonus: false });
  });
});
