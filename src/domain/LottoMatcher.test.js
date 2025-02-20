import LottoMatcher from "../domain/LottoMatcher.js";

describe("LottoMatcher 테스트", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;

  test("로또 번호와 당첨 번호가 몇 개 일치하는지 정확한 개수를 계산한다", () => {
    const matchResult = new LottoMatcher(
      [1, 2, 3, 10, 20, 30],
      winningNumbers,
      bonusNumber
    );
    expect(matchResult.countMatches()).toBe(3);
  });

  test("보너스 번호가 일치하는지 확인한다.", () => {
    const matchResultWithBonus = new LottoMatcher(
      [1, 2, 3, 4, 5, 7],
      winningNumbers,
      bonusNumber
    );
    expect(matchResultWithBonus.hasBonusMatch()).toBe(true);

    const matchResultWithoutBonus = new LottoMatcher(
      [1, 2, 3, 4, 5, 8],
      winningNumbers,
      bonusNumber
    );
    expect(matchResultWithoutBonus.hasBonusMatch()).toBe(false);
  });

  test("5개 일치 + 보너스 번호 시 2등이어야 한다", () => {
    const matchResult = new LottoMatcher(
      [1, 2, 3, 4, 5, 7],
      winningNumbers,
      bonusNumber
    );
    expect(matchResult.calculateRank()).toBe("second");
  });

  test("2개 이하로 일치하면 당첨되지 않는다.", () => {
    const matchResult = new LottoMatcher(
      [1, 2, 10, 11, 12, 13],
      winningNumbers,
      bonusNumber
    );
    expect(matchResult.calculateRank()).toBe("none");
  });
});
