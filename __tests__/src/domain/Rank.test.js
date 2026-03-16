import Rank from "../../../src/domain/Rank.js";

describe("Rank.findRank(winningMatch,bonusMatch) 메서드 테스트", () => {
  test("당첨번호가 6개 다맞춘 사람은 1등", () => {
    const [winningMatch, bonusMatch] = [6, false];
    expect(Rank.findRank(winningMatch, bonusMatch)).toBe(Rank.CONFIG.FIRST);
  });

  test("당첨번호가 5개맞고 보너스 넘버를 맞춘사람은 2등", () => {
    const [winningMatch, bonusMatch] = [5, true];
    expect(Rank.findRank(winningMatch, bonusMatch)).toBe(Rank.CONFIG.SECOND);
  });
});

describe("Rank 상금 테스트", () => {
  test("1등 상금은 2,000,000,000원이다", () => {
    expect(Rank.findRank(6, false).prize).toBe(2_000_000_000);
  });
});

describe("Rank 조건 테스트", () => {
  test("1등의 매칭 기준은 6개 일치, 보너스 없음", () => {
    const rank = Rank.findRank(6, false);
    expect(rank.matchCount).toBe(6);
    expect(rank.hasBonus).toBe(false);
  });

  test("2등의 매칭 기준은 5개 일치, 보너스 있음", () => {
    const rank = Rank.findRank(5, true);
    expect(rank.matchCount).toBe(5);
    expect(rank.hasBonus).toBe(true);
  });
});
