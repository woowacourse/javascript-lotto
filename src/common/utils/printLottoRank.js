import { RANKING } from '../constants/constants.js';
import OutputView from '../../cli/view/OutputView.js';

export const printLottoRank = (rank) => {
  const lottoRankList = [];
  Object.keys(RANKING)
    .reverse()
    .forEach((key) => {
      const ranking = RANKING[key];
      const rankCount = rank[ranking.RANK];
      lottoRankList.push([ranking.MATCH_COUNT, ranking.PRIZE.toLocaleString(), rankCount]);
      return checkSecond(ranking, rankCount);
    });

  return lottoRankList;
};

const checkSecond = (ranking, rankCount) => {
  if (ranking.RANK === 2) {
    print(`${ranking.MATCH_COUNT}개 일치, 보너스 볼 일치 (${ranking.PRIZE.toLocaleString()}원) - ${rankCount}개`);
  }

  if (ranking.RANK !== 2) {
    print(`${ranking.MATCH_COUNT}개 일치 (${ranking.PRIZE.toLocaleString()}원) - ${rankCount}개`);
  }
  return [ranking.MATCH_COUNT, ranking.PRIZE.toLocaleString(), rankCount];
};

const print = (rank) => {
  OutputView.print(rank);
};
