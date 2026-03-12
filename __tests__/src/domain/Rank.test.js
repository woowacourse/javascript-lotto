import Rank from "../../../src/domain/Rank.js";

describe("Rank.findRank(winningMatch,bonusMatch) 메서드 테스트", () => {
  test("당첨번호가 6개 다맞춘 사람은 1등", () => {
    const [winningMatch, bonusMatch] = [6, false];
    expect(Rank.findRank(winningMatch, bonusMatch)).toBe(Rank.FIRST);
  });

  test("당첨번호가 5개맞고 보너스 넘버를 맞춘사람은 2등", () => {
    const [winningMatch, bonusMatch] = [5, true];
    expect(Rank.findRank(winningMatch, bonusMatch)).toBe(Rank.SECOND);
  });

  test("당첨번호를 못 맞추면 MISS를 받는다", () => {
    const [winningMatch, bonusMatch] = [0, true];
    expect(Rank.findRank(winningMatch, bonusMatch)).toBe(Rank.MISS);
  });
});

describe("Rank.getPrize() 메서드 테스트", () => {
  test("자신의 등수에 해당하는 상금을 가져온다", () => {
    const rank = Rank.FIRST;
    expect(rank.getPrize()).toEqual({ order: 1, prize: 2_000_000_000 });
  });
});

describe("Rank.getCondition() 메서드 테스트", () => {
  test("1등의 매칭 기준을 가져온다", () => {
    const rank = Rank.FIRST;
    expect(rank.getCondition()).toEqual({
      winningCondition: 6,
      bonusCondition: false,
    });
  });

  test("2등의 매칭 기준을 가져온다", () => {
    const rank = Rank.SECOND;
    expect(rank.getCondition()).toEqual({
      winningCondition: 5,
      bonusCondition: true,
    });
  });
});
