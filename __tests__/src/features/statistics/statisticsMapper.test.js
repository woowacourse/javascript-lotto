import StatisticsMapper from "../../../../src/features/statistics/StatisticsMapper.js";
import StatisticsResponseDto from "../../../../src/features/statistics/StatisticsResponseDto.js";

describe("StatisticsMapper", () => {
  test("RankMap 데이터를 DTO로 변환한다", () => {
    const rankMap = new Map([
      [5, { matchCount: 3, hasBonus: false, prize: 5000, count: 1 }],
      [4, { matchCount: 4, hasBonus: false, prize: 50000, count: 0 }],
    ]);
    const profitRate = 500.0;

    const result = StatisticsMapper.toResponseDto(rankMap, profitRate);

    expect(result).toBeInstanceOf(StatisticsResponseDto);
    expect(result.profitRate).toBe(500.0);
    expect(result.lottosResult).toHaveLength(2);
  });

  test("order 필드를 기준으로 내림차순 정렬한다", () => {
    const rankMap = new Map([
      [4, { order: 4 }],
      [5, { order: 5 }],
    ]);

    const result = StatisticsMapper.toResponseDto(rankMap, 0);

    expect(result.lottosResult[0].order).toBe(5);
    expect(result.lottosResult[1].order).toBe(4);
  });
});
