import WinningLotto from "../src/domain/WinningLotto.js";

describe("WinningLotto", () => {
  const winningNumber = "1,2,3,4,5,6";
  const bonusNumber = 7;

  const lotto = new WinningLotto(winningNumber, bonusNumber);

  test("당첨 번호가 특정 번호를 포함하는지 확인한다.", () => {
    expect(lotto.hasNumber(1)).toBe(true);
    expect(lotto.hasNumber(7)).toBe(false);
  });

  test("보너스 번호랑 일치하는지 확인한다.", () => {
    expect(lotto.isBonus(1)).toBe(false);
    expect(lotto.isBonus(7)).toBe(true);
  });
});
