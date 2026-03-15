import StatisticsResponseDto from "./StatisticsResponseDto.js";

export default class StatisticsMapper {
  static toResponseDto(rankMap, profitRate) {
    const results = [...rankMap.entries()]
      .filter(([order]) => order !== 0)
      .map(([order, stat]) => ({ ...stat, order }))
      .sort((a, b) => b.order - a.order);

    return new StatisticsResponseDto(results, profitRate);
  }
}
