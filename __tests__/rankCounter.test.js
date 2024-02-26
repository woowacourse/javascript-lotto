import rankCounter from "../src/domain/rankCounter.js";

describe("rankCounter 테스트", () => {
  test("incrementCount 함수: 입력값이 존재하면 해당 순위의 카운트를 증가시킨다.", () => {
    const count = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const rank = 3;

    const result = rankCounter.incrementCount(count, rank);

    expect(result[rank]).toBe(1);
  });

  const rankTestCases = [
    [{ normal: 6, bonus: 0 }, 1],
    [{ normal: 5, bonus: 1 }, 2],
    [{ normal: 5, bonus: 0 }, 3],
    [{ normal: 4, bonus: 0 }, 4],
    [{ normal: 3, bonus: 0 }, 5],
  ];

  test.each(rankTestCases)("convertToRank 함수: 입력값이 %o이면 결과는 %p이다.", (input, expectedRank) => {
    expect(rankCounter.convertToRank(input)).toBe(expectedRank);
  });

  const countRanksTestCases = [
    [
      [
        { normal: 6, bonus: 0 },
        { normal: 5, bonus: 1 },
        { normal: 5, bonus: 0 },
        { normal: 4, bonus: 0 },
        { normal: 3, bonus: 0 },
      ],
      { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 },
    ],
  ];

  test.each(countRanksTestCases)(
    "countRanks 함수는 입력값이 %o일 때, 결과가 %p이다.",
    (input, expectedCounts) => {
      expect(rankCounter.countRanks(input)).toEqual(expectedCounts);
    },
  );
});
