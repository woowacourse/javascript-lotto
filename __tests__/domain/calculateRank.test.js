import { calculateRank } from "../../src/domain/calculateRank.js";

describe('로또 등수 판별 테스트', () => {
  test.each([
    [6, false, 1],
    [5, true, 2],
    [5, false, 3],
    [4, false, 4],
    [3, false, 5],
  ])(`등수가 일치하는지 판별`, (matchCount, isBonusMatch, rank) => {
    expect(calculateRank(matchCount, isBonusMatch)).toBe(rank);
  });
});
