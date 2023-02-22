import { AWARDS_ORDER, PRIZE } from '../constants/values';

const parseStatistics = (statistics) => {
  return AWARDS_ORDER.map((awards) => ({
    awards,
    prize: PRIZE[awards],
    count: statistics[awards] || 0,
  }));
};

export default parseStatistics;
