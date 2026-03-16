import StatisticsResponseDto from "./StatisticsResponseDto.js";

export default class StatisticsMapper {
  static toResponseDto(rankMap, profitRate) {
    const results = [...rankMap.entries()]
      .map(([order, { prize, count, matchCount, hasBonus }]) => ({
        order,
        prize,
        count,
        matchCount,
        hasBonus,
      }))
      .sort((a, b) => b.order - a.order);

    return new StatisticsResponseDto(results, profitRate);
  }
}
