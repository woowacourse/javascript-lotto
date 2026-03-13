import LottoStatisticsResponseDto from "./statisticsResponseDto.js";

export default class statisticsMapper {
  static toResponseDto(rankMap) {
    let totalPrize = 0;

    const lottosResult = [...rankMap.entries()]
      .filter(([rank]) => rank.order !== 0)
      .map(([rank, stat]) => {
        totalPrize += rank.prize * stat.count;
        return {
          matchCount: rank.winningCondition,
          hasBonus: rank.bonusCondition,
          prize: rank.prize,
          count: stat.count,
          order: rank.order,
        };
      })
      .sort((a, b) => b.order - a.order);

    return new LottoStatisticsResponseDto(lottosResult, totalPrize);
  }
}
