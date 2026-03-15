import StatisticsResponseDto from "./statisticsResponseDto.js";

export default class StatisticsMapper {
  static toResponseDto(rankMap) {
    const { results, totalPrize } = [...rankMap.entries()].reduce(
      (acc, [order, { matchCount, hasBonus, prize, count }]) => {
        if (order === 0) return acc;

        return {
          results: [
            ...acc.results,
            { matchCount, hasBonus, prize, count, order },
          ],
          totalPrize: acc.totalPrize + prize * count,
        };
      },
      { results: [], totalPrize: 0 },
    );

    const sortedResults = results.sort((a, b) => b.order - a.order);
    return new StatisticsResponseDto(sortedResults, totalPrize);
  }
}
