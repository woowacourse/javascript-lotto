import { PRIZE } from "../../src/constants/prize.js";
import formatResults from "../../src/domain/formatResults.js";

describe("domain/formatResults", () => {
  test("각 등수가 올바르게 매핑되는지 확인", () => {
    const resultCount = [3, 0, 1, 1, 1];
    const formattedResults = formatResults(resultCount);

    expect(formattedResults).toHaveLength(Object.keys(PRIZE).length);

    formattedResults.forEach(({ rank }, index) => {
      expect(rank).toBe(Object.keys(PRIZE)[index]);
    });
  });

  test("당첨 조건과 당첨 금액이 올바르게 매핑되는지 확인", () => {
    const resultCount = [0, 1, 2, 3, 4, 5];

    const formattedResults = formatResults(resultCount);

    formattedResults.forEach(({ rank, winningCriteria, reward }) => {
      expect(winningCriteria).toBe(PRIZE[rank].WINNING_CRITERIA);
      expect(reward).toBe(PRIZE[rank].REWARD);
    });
  });

  test("당첨 개수를 올바르게 가져오는지 확인", () => {
    const resultCount = [0, 1, 2, 3, 4, 5];

    const formattedResults = formatResults(resultCount);

    formattedResults.forEach(({ count }, index) => {
      expect(count).toBe(resultCount[index + 1]);
    });
  });

  test("당첨 개수가 없을 때 0이 들어가는지 확인", () => {
    const resultCount = [];

    const formattedResults = formatResults(resultCount);

    formattedResults.forEach(({ count }) => {
      expect(count).toBe(0);
    });
  });
});
