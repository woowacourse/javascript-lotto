import formatResults from "../../src/domain/formatResults.js";

describe("domain/formatResults", () => {
  test("각 등수가 올바르게 매핑되는지 확인 - 2등, 3등, 4등이 1개씩 당첨된 경우", () => {
    const resultCount = [0, 0, 1, 1, 1, 0];
    const formattedResults = formatResults(resultCount);

    expect(formattedResults).toEqual([
      { count: 0, rank: "FIRST", reward: 2000000000, winningCriteria: 6 },
      { count: 1, rank: "SECOND", reward: 30000000, winningCriteria: 5 },
      { count: 1, rank: "THIRD", reward: 1500000, winningCriteria: 5 },
      { count: 1, rank: "FOURTH", reward: 50000, winningCriteria: 4 },
      { count: 0, rank: "FIFTH", reward: 5000, winningCriteria: 3 },
    ]);
  });
});
