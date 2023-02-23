import { AWARDS_ORDER, PRIZE } from '../constants/values';

const parseStatisticsInfo = (info) => {
  if (typeof info === 'number') return `${info}개`;

  return info;
};

const parseStatistics = (statistics) => {
  return AWARDS_ORDER.map((awards) => ({
    awards: parseStatisticsInfo(awards),
    prize: PRIZE[awards],
    count: parseStatisticsInfo(statistics[awards] || 0),
  }));
};

export default parseStatistics;
