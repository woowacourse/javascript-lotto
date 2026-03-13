import statisticsMapper from "../../../../src/features/statistics/statisticsMapper.js";
import LottoStatisticsResponseDto from "../../../../src/features/statistics/statisticsResponseDto.js";

describe("statisticsMapper 테스트", () => {
  const RANK_5TH = {
    winningCondition: 3,
    bonusCondition: false,
    prize: 5000,
    order: 5,
  };
  const RANK_4TH = {
    winningCondition: 4,
    bonusCondition: false,
    prize: 50000,
    order: 4,
  };
  const RANK_MISS = {
    winningCondition: 0,
    bonusCondition: false,
    prize: 0,
    order: 0,
  };

  test("RankMap을 받아서 필터링, 상금 계산, 정렬된 DTO를 반환한다", () => {
    const rankMap = new Map();
    rankMap.set(RANK_5TH, { count: 2 });
    rankMap.set(RANK_4TH, { count: 1 });
    rankMap.set(RANK_MISS, { count: 10 });

    const dto = statisticsMapper.toResponseDto(rankMap);

    expect(dto).toBeInstanceOf(LottoStatisticsResponseDto);
    expect(dto.totalPrize).toBe(60000);
    expect(dto.lottosResult).toHaveLength(2);
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

  test("모든 등수가 낙첨(order: 0)일 경우 결과 배열은 비어있고 상금은 0원이다", () => {
    const rankMap = new Map();
    rankMap.set(RANK_MISS, { count: 100 });

    const dto = statisticsMapper.toResponseDto(rankMap);

    expect(dto.lottosResult).toHaveLength(0);
    expect(dto.totalPrize).toBe(0);
  });
});
