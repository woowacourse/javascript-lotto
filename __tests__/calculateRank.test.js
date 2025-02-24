import { calculateRank } from '../src/domain/calculateRank.js';

describe('calculateRank 함수 테스트', () => {
  test.each([
    [6, false, 1],
    [5, true, 2],
    [5, false, 3],
    [4, false, 4],
    [3, false, 5],
  ])(`일치하는 개수(%i)와 보너스 여부(%s)에 따라 등수가 %i인지 확인한다`, (matchCount, isBonusMatch, rank) => {
    expect(calculateRank(matchCount, isBonusMatch)).toBe(rank);
  });
});
