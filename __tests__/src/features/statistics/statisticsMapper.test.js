import statisticsMapper from "../../../../src/features/statistics/statisticsMapper.js";
import LottoStatisticsResponseDto from "../../../../src/features/statistics/statisticsResponseDto.js";

describe("statisticsMapper 테스트", () => {
  const STAT_5TH = {
    matchCount: 3,
    hasBonus: false,
    prize: 5000,
    count: 2,
  };
  const STAT_4TH = {
    matchCount: 4,
    hasBonus: false,
    prize: 50000,
    count: 1,
  };
  const STAT_MISS = {
    matchCount: 0,
    hasBonus: false,
    prize: 0,
    count: 10,
  };

  test("RankMap을 받아서 상금 계산 및 정렬된 DTO를 반환한다", () => {
    const rankMap = new Map();
    rankMap.set(5, STAT_5TH);
    rankMap.set(4, STAT_4TH);

    const dto = statisticsMapper.toResponseDto(rankMap);

    expect(dto).toBeInstanceOf(LottoStatisticsResponseDto);
    expect(dto.totalPrize).toBe(60000);

    expect(dto.lottosResult[0].order).toBe(5);
    expect(dto.lottosResult[1].order).toBe(4);

    expect(dto.lottosResult[0]).toEqual({
      matchCount: 3,
      hasBonus: false,
      prize: 5000,
      count: 2,
      order: 5,
    });
  });

  test("낙첨 데이터만 있을 경우 (상금이 0원인 경우) 처리", () => {
    const rankMap = new Map();
    rankMap.set(0, STAT_MISS);

    const dto = statisticsMapper.toResponseDto(rankMap);

    const filteredResults = dto.lottosResult.filter((r) => r.order !== 0);
    expect(filteredResults).toHaveLength(0);
    expect(dto.totalPrize).toBe(0);
  });
});
