/* eslint-disable max-lines-per-function */
import prize from '../../src/domain/prize';

describe('prize 객체 테스트', () => {
  describe('PRIZE 상수에서 rank로 해당 등수의 matchCount를 찾아준다.', () => {
    test.each([
      { rank: 'FIRST_PLACE', expectedMatchCount: 6 },
      { rank: 'SECOND_PLACE', expectedMatchCount: 5 },
      { rank: 'THIRD_PLACE', expectedMatchCount: 5 },
      { rank: 'FOURTH_PLACE', expectedMatchCount: 4 },
      { rank: 'FIFTH_PLACE', expectedMatchCount: 3 },
    ])('rank가 $rank일 때 matchCount는 $expectedMatchCount이다.', ({ rank, expectedMatchCount }) => {
      const matchCount = prize.getMatchCountByRank(rank);

      expect(matchCount).toBe(expectedMatchCount);
    });
  });

  describe('PRIZE 상수에서 rank로 해당 등수의 reward를 찾아준다.', () => {
    test.each([
      { rank: 'FIRST_PLACE', expectedReward: 2_000_000_000 },
      { rank: 'SECOND_PLACE', expectedReward: 30_000_000 },
      { rank: 'THIRD_PLACE', expectedReward: 1_500_000 },
      { rank: 'FOURTH_PLACE', expectedReward: 50_000 },
      { rank: 'FIFTH_PLACE', expectedReward: 5_000 },
    ])('등수가 $rank일 때 reward는 $expectedReward이다.', ({ rank, expectedReward }) => {
      const matchCount = prize.getRewarByRank(rank);

      expect(matchCount).toBe(expectedReward);
    });
  });

  describe('PRIZE 상수에서 rank로 해당 등수의 isBonus를 찾아준다.', () => {
    test.each([
      { rank: 'FIRST_PLACE', expectedIsBonus: false },
      { rank: 'SECOND_PLACE', expectedIsBonus: true },
      { rank: 'THIRD_PLACE', expectedIsBonus: false },
      { rank: 'FOURTH_PLACE', expectedIsBonus: false },
      { rank: 'FIFTH_PLACE', expectedIsBonus: false },
    ])('등수가 $rank일 때 reward는 $expectedReward이다.', ({ rank, expectedIsBonus }) => {
      const isBonus = prize.getIsBonusByRank(rank);

      expect(isBonus).toBe(expectedIsBonus);
    });
  });

  describe('PRIZE 상수에서 matchCount와 isBonus로 해당 등수를 찾아준다.', () => {
    test.each([
      { numberMatchCount: 6, isBonus: false, expectedRank: 'FIRST_PLACE' },
      { numberMatchCount: 5, isBonus: true, expectedRank: 'SECOND_PLACE' },
      { numberMatchCount: 5, isBonus: false, expectedRank: 'THIRD_PLACE' },
      { numberMatchCount: 4, isBonus: false, expectedRank: 'FOURTH_PLACE' },
      { numberMatchCount: 3, isBonus: false, expectedRank: 'FIFTH_PLACE' },
    ])(
      'matchCount가 $numberMatchCount고 isBonus가 $isBonus일 때 rank는 $expectedRank이다.',
      ({ numberMatchCount, isBonus, expectedRank }) => {
        const rank = prize.getRankByMatchCountAndBonus({ numberMatchCount, isBonus });

        expect(rank).toBe(expectedRank);
      },
    );
  });

  test('', () => {
    const initailResultObject = prize.getInitiallResultObject();
    const expectedInitialResultObject = {
      FIRST_PLACE: 0,
      SECOND_PLACE: 0,
      THIRD_PLACE: 0,
      FOURTH_PLACE: 0,
      FIFTH_PLACE: 0,
      NONE_PLACE: 0,
    };
    expect(initailResultObject).toEqual(expectedInitialResultObject);
  });

  describe('등수별 당첨 갯수가 들어있는 오브젝트로 총상금을 계산해준다.', () => {
    test.each([
      {
        description: '1등 1개, 3등 1개',
        totalResult: {
          FIRST_PLACE: 1,
          SECOND_PLACE: 0,
          THIRD_PLACE: 1,
          FOURTH_PLACE: 0,
          FIFTH_PLACE: 0,
          NONE_PLACE: 0,
        },
        expectedTotalReward: 2_000_000_000 + 1_500_000,
      },
      {
        description: '3등 1개, 5등 2개',
        totalResult: {
          FIRST_PLACE: 0,
          SECOND_PLACE: 0,
          THIRD_PLACE: 1,
          FOURTH_PLACE: 0,
          FIFTH_PLACE: 2,
          NONE_PLACE: 0,
        },
        expectedTotalReward: 1_500_000 + 5_000 * 2,
      },
      {
        description: '2등 1개, 4등 1개, 5등 1개',
        totalResult: {
          FIRST_PLACE: 0,
          SECOND_PLACE: 1,
          THIRD_PLACE: 0,
          FOURTH_PLACE: 1,
          FIFTH_PLACE: 1,
          NONE_PLACE: 0,
        },
        expectedTotalReward: 30_000_000 + 50_000 + 5_000,
      },
    ])(
      '로또 구매 결과가 $description일 때 총 당첨금은 $expectedTotalReward원이다.',
      ({ totalResult, expectedTotalReward }) => {
        const totalReward = prize.getTotalRewardByTotalResult(totalResult);

        expect(totalReward).toEqual(expectedTotalReward);
      },
    );
  });
});
