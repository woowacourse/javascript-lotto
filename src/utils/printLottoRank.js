import { RANKING } from '../constants/constants.js';
import OutputView from '../view/OutputView.js';

export const printLottoRank = (rank) => {
  Object.keys(RANKING)
    .reverse()
    .forEach((key) => {
      const ranking = RANKING[key];
      const rankCount = rank[ranking.RANK];
      return checkSecond(ranking, rankCount);
    });
};

const checkSecond = (ranking, rankCount) => {
  if (ranking.RANK === 2) {
    print(`${ranking.MATCH_COUNT}개 일치, 보너스 볼 일치 (${ranking.PRIZE.toLocaleString()}원) - ${rankCount}개`);
  }

  if (ranking.RANK !== 2) {
    print(`${ranking.MATCH_COUNT}개 일치 (${ranking.PRIZE.toLocaleString()}원) - ${rankCount}개`);
  }
};

const print = (rank) => {
  OutputView.print(rank);
};
