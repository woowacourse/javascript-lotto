import { RANKING } from '../constants/constants.js';
import OutputView from '../view/OutputView.js';

export const printLottoResult = (result) => {
  Object.keys(RANKING).reverse().forEach((key) => {
    const ranking = RANKING[key];
    const resultCount = result[ranking.RANK];
    return checkSecond(ranking, resultCount);
  });
};

const checkSecond = (ranking, resultCount) => {
  if (ranking.RANK === 2) {
    print(`${ranking.MATCH_COUNT}개 일치, 보너스 볼 일치 (${ranking.PRIZE.toLocaleString()}원) - ${resultCount}개`);
  } 

  if (ranking.RANK !== 2) {
    print(`${ranking.MATCH_COUNT}개 일치 (${ranking.PRIZE.toLocaleString()}원) - ${resultCount}개`);
  } 
};

const print=(result)=>{
  OutputView.print(result)
}
